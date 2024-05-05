#!/bin/bash
# Comprueba si se proporcionaron los argumentos correctos
if [ "$#" -ne 2 ]; then
    echo "Uso: $0 <file> <bucket/path>"
    exit 1
fi
FILE=$1
BUCKET_PATH=$2
# Comprueba si el archivo existe
if [ ! -f "$FILE" ]; then
    echo "$FILE no existe."
    exit 1
fi
# Si BUCKET_PATH no contiene un '/', asume que es solo el nombre del bucket
if [[ $BUCKET_PATH != */* ]]; then
    BUCKET_PATH="$BUCKET_PATH"
else
    BUCKET_PATH="$BUCKET_PATH/$(basename $FILE)"
fi
# Sube el archivo al bucket S3
aws s3 cp $FILE s3://$BUCKET_PATH/
echo "Archivo $FILE subido a s3://$BUCKET_PATH."