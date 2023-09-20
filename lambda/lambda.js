import { S3Client, CopyObjectCommand, HeadObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export const handler = async (event) => {
    
    const bucketName = event.Records[0].s3.bucket.name;
    const keyName = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    
    const input = {
        Bucket: bucketName,
        Key: keyName
    };
      
    const client = new S3Client({});
    
    try {
        const headCommand = new HeadObjectCommand(input);
        const headResult = await client.send(headCommand);

        const category = headResult.Metadata.category;
        if (!category) {
            console.log(`No category metadata for object ${keyName}.`);
            return;
        }
        
        const newKey = `${category}/${keyName}`;
        const output = {
            Bucket: bucketName,
            Key: newKey,
            CopySource: `${bucketName}/${keyName}`
        };
        
        const copyCommand = new CopyObjectCommand(output);
        await client.send(copyCommand);
        
        const deleteCommand = new DeleteObjectCommand(input);
        await client.send(deleteCommand);
        
        console.log('New key: ', newKey);
    } catch (error) {
        console.log(`Failed ${keyName}.`, error);
        throw error;
    }

};
