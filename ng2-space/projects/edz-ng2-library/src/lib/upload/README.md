### 配置说明
```typescript
  uploadConfig: IUploadConfig<string[]> = {
    name: 'fileData',
    url: '/upload-api/fileOpt/fileUpload',
    handler: (upload, res) => {
      if (res.body && res.body.code === 0) {
        upload.onSuccess(res.body, upload.file, res)
      } else {
        this.message.warning('上传失败')
        upload.onError('上传失败!', upload.file)
      }
    },
    transfer: {
      valueToFileList: value => value.map((item, index) => ({
        name: `文件${index + 1}`,
        uid: Math.random().toString(36).substring(2),
        filename: `文件${index + 1}`,
        response: { code: 0, data: item },
        percent: 100,
        thumbUrl: item,
        status: 'done',
        url: item,
      })),
      fileListToValue: fileList => fileList.filter(item => item.status === 'done' || item.status === 'success')
        .map(item => item.response?.data || ''),
    },
  }
```
