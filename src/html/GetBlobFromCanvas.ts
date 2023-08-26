export const getBlobAsync = (canvas: HTMLCanvasElement, mime: string, quality: number = 0.8): Promise<Blob> => {
    return new Promise((resolve) => {
        canvas.toBlob(blob => {
            if (blob) resolve(blob);
        }, mime, quality);
    });
}