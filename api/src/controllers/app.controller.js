
// https://echo-serv.tbxnet.com/v1/secret/files
import fetch from 'node-fetch';

export const getFiles = async (req, res) => {
    console.log("GhOSD");

    const headerValue = 'Bearer aSuperSecretKey'

    try {
        const filesResponse = await fetch("https://echo-serv.tbxnet.com/v1/secret/files", {
            headers: { 
                'Authorization': `${headerValue}`,
            }
        });

        const filesData = await filesResponse.json();

        const files = filesData.files;
        const finalFileResult = [];

        for (const file of files) {
            try {
                const publicApiAboutFilesResponse = await fetch(`https://echo-serv.tbxnet.com/v1/secret/file/${file}`, {
                    headers: { 
                        'Authorization':  `${headerValue}`,
                    }
                });

                if (!publicApiAboutFilesResponse.ok) { 
                    console.log(`Archivo ${file} incompleto`)
                }

                const csvContent = await publicApiAboutFilesResponse.text();
                const lines = csvContent.split('\n').slice(1); 

                const fileContent = {
                    file,
                    lines: []
                };

                for (const line of lines) {
                    const [file, text, number, hex] = line.split(',');

                    if (file && text && number && hex) {
                        fileContent.lines.push({
                            text: text.trim(),
                            number: parseInt(number.trim(), 10),
                            hex: hex.trim()
                        });
                    }
                }

                if (fileContent.lines.length > 0) {
                    finalFileResult.push(fileContent);
                }

            } catch (error) {
                console.error(`Error procesando el archivo ${file}:`, error.message);
            }
        }

        res.status(200).send(finalFileResult);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al procesar los archivos');
    }
};