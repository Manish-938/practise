const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const path = require("path");
const fs = require("fs");

const { firebaseapp } = require("../server");

module.exports.fileUpload = async (req, res) => {
  try {
    const storage = getStorage(firebaseapp);

    const dir = path.join(__dirname, "..", "..", "..", "Pictures");
    const fileList = fs.readdirSync(dir);

    const downloadUrls = [];

    for (let file of fileList) {
      const split = file.split(".");
      const imageType = split.pop();
      const filename = dir + "/" + file;
      const fileBuffer = fs.readFileSync(filename);

      const storageRef = ref(storage, `dummy/${filename}/${Date.now()}`);
      const metatype = {
        contentType: `image/${imageType}`,
      };

      const uploadTask = await uploadBytesResumable(
        storageRef,
        fileBuffer,
        metatype
      );

      const downloadUrl = await getDownloadURL(uploadTask.ref);
      // console.log("downloadUrl", downloadUrl);
      downloadUrls.push(downloadUrl);
    }

    return res.send({
      status: 200,
      data: downloadUrls,
    });
  } catch (error) {
    console.log("error", error);
    return res.send({
      status: 400,
      mesaage: `error ${error}`,
    });
  }
};
