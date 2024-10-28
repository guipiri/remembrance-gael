import { PutObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";

const { CFBUCKETACCESSKEYID, CFBUCKETSECRETACCESSKEY, CFBUCKETURL } = {
  CFBUCKETACCESSKEYID: "1555bfa463273db3cc306434b7916523",
  CFBUCKETSECRETACCESSKEY:
    "5452986873ae910cca0e9193d3c9a7e8c2bc92cd28dbb9a400a22c6285286128",
  CFBUCKETURL:
    "https://c432a6fff8e9e38767fd55e7f046d08b.r2.cloudflarestorage.com",
};

const S3 = new S3Client({
  region: "auto",
  endpoint: `${CFBUCKETURL}`,
  credentials: {
    accessKeyId: `${CFBUCKETACCESSKEYID}`,
    secretAccessKey: `${CFBUCKETSECRETACCESSKEY}`,
  },
});

export const uploadFile = async (
  file: Buffer,
  imageName: string,
  mimetype: string
) => {
  const putCommand = new PutObjectCommand({
    Bucket: "cha-de-bebe-gael",
    Key: imageName,
    Body: file,
    ContentType: `image/${mimetype}`,
  });
  const res = await S3.send(putCommand);
  return res;
};
