import { v4 as uuid } from "uuid";
import { File } from "../@types";
import Service from "../Service";

class FileService extends Service {

    static async upload(file: File) {
        
        const extension = this.getFileExtension(file.name)
        const fileName = this.generateFileName(extension)

        const signedUrl = await this.getSignedUrl({
            fileName: fileName,
            contentLength: file.size
        })
        
        await this.uploadFileToSignedUrl(signedUrl, file)

        return signedUrl.split('?')[0]
    }

    private static generateFileName(extension: string) {
        return `${uuid()}.${extension}`
    }

    private static getFileExtension(fileName: string) {
        const [extension] = fileName.split('.').slice(-1)
        return extension
    }

    private static getSignedUrl (fileInfo: File.UploadRequestInput) {
        return this.Http
            .post<File.UploadRequest>('/upload-requests', fileInfo)
            .then(this.getData)
            .then(res => res.uploadSignedUrl)
    }

    //Implementação para o GCP
    private static uploadFileToSignedUrl (signedUrl: string, file: File) {
        return this.Http
            .put(signedUrl, file, {
                headers: { 'Content-Type': file.type }
            })
            .then(this.getData)
    }

}


export default FileService