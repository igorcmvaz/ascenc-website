#!/bin/sh
set -e

CERT_DIR="/etc/nginx/certs"
CERT_FILE="${CERT_DIR}/sustainability.ufsc.br.crt"
KEY_FILE="${CERT_DIR}/sustainability.ufsc.br.key"

# Garante a existência do diretório de certificados
mkdir -p "${CERT_DIR}"

# Verifica se os certificados existem; caso contrário, gera certificados autoassinados para inicialização
if [ ! -f "${CERT_FILE}" ] || [ ! -f "${KEY_FILE}" ]; then
    echo "[Entrypoint] Certificados SSL não encontrados em ${CERT_DIR}."
    echo "[Entrypoint] Gerando certificado autoassinado temporário para sustainability.ufsc.br..."
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout "${KEY_FILE}" \
        -out "${CERT_FILE}" \
        -subj "/C=BR/ST=SC/L=Florianopolis/O=UFSC/CN=sustainability.ufsc.br" 2>/dev/null
    echo "[Entrypoint] Certificado temporário gerado com sucesso."
    echo "[Entrypoint] Em ambiente de produção da UFSC, monte o certificado *.ufsc.br em ${CERT_FILE} e a chave em ${KEY_FILE}."
else
    echo "[Entrypoint] Certificados SSL encontrados em ${CERT_DIR}. Inicializando Nginx com os certificados fornecidos."
fi

exec "$@"
