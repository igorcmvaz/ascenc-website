#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Script de Sincronização: dados_site/*.xlsx -> React Components
Lê os arquivos Excel em dados_site/ e atualiza o conteúdo do site (Team.jsx, Partners.jsx, Papers.jsx).
"""

import os
import re
import json
import openpyxl

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DADOS_DIR = os.path.join(BASE_DIR, "dados_site")
PAGES_DIR = os.path.join(BASE_DIR, "src", "pages")

print(f"Sincronizando dados de {DADOS_DIR}...")

# 1. SINCRONIZAR MEMBROS (membros.xlsx -> Team.jsx)
membros_file = os.path.join(DADOS_DIR, "membros.xlsx")
if os.path.exists(membros_file):
    wb = openpyxl.load_workbook(membros_file)
    ws = wb.active
    
    professors = []
    researchers = []
    former_members = []
    
    for row in ws.iter_rows(min_row=5, values_only=True):
        if not row or not row[1]: # Skip empty rows
            continue
        
        row_id, nome, cat, cargo, foto, caminho_foto, orcid, lattes, rg, email = row[:10]
        cat = str(cat or "").strip()
        nome = str(nome or "").strip()
        if nome.lower() in ["nome", "name"] or str(row_id).strip().lower() in ["id", "id_membro"]:
            continue
        cargo = str(cargo or "").strip()
        caminho_foto = str(caminho_foto or "").strip()
        orcid = str(orcid or "").strip()
        lattes = str(lattes or "").strip()
        rg = str(rg or "").strip()
        
        member_obj = {
            "name": nome,
            "role": cargo,
            "image": caminho_foto,
            "orcid": orcid if orcid != "—" else "",
            "lattes": lattes if lattes != "—" else "",
            "researchgate": rg if rg != "—" else ""
        }
        # Clean empty keys
        member_obj = {k: v for k, v in member_obj.items() if v}
        
        if cat == "Docente":
            professors.append(member_obj)
        elif cat == "Ex-Membro":
            former_obj = {"name": nome}
            if lattes and lattes != "—":
                former_obj["lattes"] = lattes
            former_members.append(former_obj)
        else:
            researchers.append(member_obj)
            
    print(f"Membros carregados: {len(professors)} professores, {len(researchers)} pesquisadores, {len(former_members)} ex-membros.")


# 2. SINCRONIZAR COLABORADORES E PARCEIROS (colaboradores.xlsx -> Partners.jsx)
colab_file = os.path.join(DADOS_DIR, "colaboradores.xlsx")
if os.path.exists(colab_file):
    wb = openpyxl.load_workbook(colab_file)
    ws = wb.active
    
    collaborators = []
    universities = []
    
    for row in ws.iter_rows(min_row=5, values_only=True):
        if not row or not row[2]:
            continue
            
        row_id, tipo, nome, cargo, foto_logo, caminho, url_site, orcid, lattes, rg = row[:10]
        tipo = str(tipo or "").strip()
        nome = str(nome or "").strip()
        if nome.lower() in ["nome", "name"] or str(row_id).strip().lower() in ["id", "id_colaborador"]:
            continue
        cargo = str(cargo or "").strip()
        caminho = str(caminho or "").strip()
        url_site = str(url_site or "").strip()
        orcid = str(orcid or "").strip()
        lattes = str(lattes or "").strip()
        rg = str(rg or "").strip()
        
        if tipo == "Colaborador":
            colab_obj = {
                "name": nome,
                "role": cargo,
                "image": caminho,
                "orcid": orcid if orcid != "—" else "",
                "lattes": lattes if lattes != "—" else "",
                "researchgate": rg if rg != "—" else ""
            }
            colab_obj = {k: v for k, v in colab_obj.items() if v}
            collaborators.append(colab_obj)
        elif tipo == "Instituição Parceira":
            uni_obj = {
                "name": nome,
                "description": cargo,
                "img": caminho,
                "url": url_site
            }
            universities.append(uni_obj)
            
    print(f"Parcerias carregadas: {len(collaborators)} colaboradores, {len(universities)} instituições.")


# 3. SINCRONIZAR ARTIGOS (artigos.xlsx -> Papers.jsx)
artigos_file = os.path.join(DADOS_DIR, "artigos.xlsx")
if os.path.exists(artigos_file):
    wb = openpyxl.load_workbook(artigos_file)
    ws = wb.active
    
    all_papers = {}
    
    for row in ws.iter_rows(min_row=5, values_only=True):
        if not row or not row[2]:
            continue
            
        row_id, ano, titulo, autores, detalhes, doi, tags_str, citacoes = row[:8]
        ano = str(ano or "").strip()
        titulo = str(titulo or "").strip()
        autores = str(autores or "").strip()
        detalhes = str(detalhes or "").strip()
        detalhes = re.sub(r"\.\s*DOI\s*$", "", detalhes, flags=re.IGNORECASE).strip()
        detalhes = re.sub(r"\s+DOI\s*$", "", detalhes, flags=re.IGNORECASE).strip()
        doi = str(doi or "").strip()
        if doi and doi != "—" and not doi.startswith("http://") and not doi.startswith("https://"):
            if doi.startswith("10."):
                doi = f"https://doi.org/{doi}"
            else:
                doi = f"https://{doi}"
        tags_str = str(tags_str or "").strip()
        citacoes = str(citacoes or "").strip()
        
        tags = [t.strip() for t in tags_str.split(",") if t.strip()]
        
        try:
            pid = int(row_id)
        except (ValueError, TypeError):
            continue

        paper_obj = {
            "id": pid,
            "authors": autores,
            "title": titulo,
            "details": detalhes,
            "year": ano,
            "citations": citacoes,
            "doi": doi,
            "tags": tags
        }
        
        if ano not in all_papers:
            all_papers[ano] = []
        all_papers[ano].append(paper_obj)
        
    total_papers = sum(len(v) for v in all_papers.values())
    print(f"Artigos carregados: {total_papers} artigos divididos em {len(all_papers)} anos.")


# 3.5 SINCRONIZAR PROJETOS (dados_site/projetos.xlsx -> src/data/projectsData.json)
projetos_file = os.path.join(DADOS_DIR, "projetos.xlsx")

if os.path.exists(projetos_file):
    wb = openpyxl.load_workbook(projetos_file)
    ws = wb.active
    
    rows = list(ws.iter_rows(values_only=True))
    if rows:
        header_row = [str(cell or "").strip() for cell in rows[0]]
        projects_list = []
        
        for row in rows[1:]:
            if not row or not row[0]:
                continue
            row_dict = {}
            for col_idx, col_name in enumerate(header_row):
                if col_name:
                    val = row[col_idx] if col_idx < len(row) else ""
                    row_dict[col_name] = str(val or "").strip()
            
            if row_dict.get("id", "").lower() in ["id", "id_projeto"]:
                continue
                
            projects_list.append(row_dict)
            
        json_path = os.path.join(BASE_DIR, "src", "data", "projectsData.json")
        os.makedirs(os.path.dirname(json_path), exist_ok=True)
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(projects_list, f, ensure_ascii=False, indent=2)
        print(f"Projetos carregados: {len(projects_list)} projetos gravados em {json_path}.")

# 4. GRAVAR DADOS NOS COMPONENTES REACT
# A) Team.jsx
team_path = os.path.join(PAGES_DIR, "Team.jsx")
if os.path.exists(team_path) and professors:
    with open(team_path, "r", encoding="utf-8") as f:
        team_code = f.read()

    prof_json = json.dumps(professors, indent=4, ensure_ascii=False)
    res_json = json.dumps(researchers, indent=4, ensure_ascii=False)
    former_json = json.dumps(former_members, indent=4, ensure_ascii=False)

    team_code = re.sub(r"const professors = \[.*?\];", f"const professors = {prof_json};", team_code, flags=re.DOTALL)
    team_code = re.sub(r"const researchers = \[.*?\];", f"const researchers = {res_json};", team_code, flags=re.DOTALL)
    team_code = re.sub(r"const formerMembers = \[.*?\];", f"const formerMembers = {former_json};", team_code, flags=re.DOTALL)

    with open(team_path, "w", encoding="utf-8") as f:
        f.write(team_code)
    print("-> Team.jsx atualizado com sucesso!")

# B) Partners.jsx
partners_path = os.path.join(PAGES_DIR, "Partners.jsx")
if os.path.exists(partners_path) and universities:
    with open(partners_path, "r", encoding="utf-8") as f:
        partners_code = f.read()

    unis_json = json.dumps(universities, indent=4, ensure_ascii=False)
    colabs_json = json.dumps(collaborators, indent=4, ensure_ascii=False)

    partners_code = re.sub(r"const universities = \[.*?\];", f"const universities = {unis_json};", partners_code, flags=re.DOTALL)
    partners_code = re.sub(r"const collaborators = \[.*?\];", f"const collaborators = {colabs_json};", partners_code, flags=re.DOTALL)

    with open(partners_path, "w", encoding="utf-8") as f:
        f.write(partners_code)
    print("-> Partners.jsx atualizado com sucesso!")

# C) Papers.jsx
papers_path = os.path.join(PAGES_DIR, "Papers.jsx")
if os.path.exists(papers_path) and all_papers:
    with open(papers_path, "r", encoding="utf-8") as f:
        papers_code = f.read()

    papers_json = json.dumps(all_papers, indent=4, ensure_ascii=False)
    papers_code = re.sub(r"const allPapers = \{.*?\};\n\n  // Sort years", f"const allPapers = {papers_json};\n\n  // Sort years", papers_code, flags=re.DOTALL)

    with open(papers_path, "w", encoding="utf-8") as f:
        f.write(papers_code)
    print("-> Papers.jsx atualizado com sucesso!")

print("\nSincronizacao completa! O site foi atualizado com base nos arquivos .xlsx em dados_site/")
