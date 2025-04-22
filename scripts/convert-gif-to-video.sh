#!/bin/bash

# Script para convertir GIF a video MP4 optimizado para web
# Uso: ./convert-gif-to-video.sh input.gif

if [ $# -eq 0 ]; then
    echo "Error: No se proporcionó un archivo GIF"
    echo "Uso: ./convert-gif-to-video.sh input.gif"
    exit 1
fi

INPUT_FILE=$1
OUTPUT_FILE="${INPUT_FILE%.*}.mp4"

echo "Convirtiendo $INPUT_FILE a $OUTPUT_FILE..."

# Convertir GIF a MP4 con buena calidad y tamaño reducido
ffmpeg -i "$INPUT_FILE" -b:v 0 -crf 25 -f mp4 -vcodec libx264 -pix_fmt yuv420p "$OUTPUT_FILE"

# Mostrar información sobre los archivos
echo "Conversión completada."
echo "Tamaño del GIF original: $(du -h "$INPUT_FILE" | cut -f1)"
echo "Tamaño del video MP4: $(du -h "$OUTPUT_FILE" | cut -f1)"

echo "El video se ha guardado como $OUTPUT_FILE"
