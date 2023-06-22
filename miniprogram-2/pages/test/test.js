// pages/test/test.js

import Toast from 'tdesign-miniprogram/toast/index';
//初始化云
wx.cloud.init({
  env: 'test-2gwe4zxva4b3e501'
})
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    image: 'https://tdesign.gtimg.com/miniprogram/images/logo1.png',
  },
  FunSearch(e) {
    console.log('aaa')
    Toast({
      selector: '#t-toast',
      context: this,
      message: '正在搜索',
      theme: 'success',
      direction: 'column',
    })
  },
  GetData(e) {
    //#region 1.SQL Count
    // db.collection('MySmallShop').count().then((res) => {
    //   console.log(res)
    // })
    //#endregion

    //#region 2.Get
    // let data = db.collection('MySmallShop').get({
    //   success: function (res) {
    //     console.log(res.data)
    //   },
    //   fail: function (err) {
    //     console.log(err)
    //   }
    // })
    //#endregion

    //#region 3.Where
    // const _ = db.command;
    // db.collection('MySmallShop').where({
    //   price: _.eq(15)
    // }).get({
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function (err) {
    //     console.log(err)
    //   }
    // })
    //#endregion

    //#region 4.Add
    // db.collection('MySmallShop').add({
    //   data: {
    //     _id: Date.now(),
    //     category: "fruit",
    //     name: "durian",
    //     price: Math.floor(Math.random() * 11),
    //     type: ["金枕榴莲", "山猫榴莲", "泰国榴莲"]
    //   },
    // }).then(res => {
    //   console.log(res)
    // })
    //#endregion

    //#region 5.update
    // db.collection('MySmallShop').doc("618464a36489c2ad000ac8ca32b5f997").update({
    //   // data 传入需要局部更新的数据
    //   data:{
    //     ProductID: 15
    //   },
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function (err) {
    //     console.log('fail--' + err)
    //   }
    // })
    //#endregion

    //#region 6.update by doc
    // db.collection('MySmallShop').doc(1687016515753).update({
    //   data: {
    //     price: 15.8
    //   }
    // }).then(res => {
    //   console.log(res)
    // })
    //#endregion

    //#region 7.update by where
    // db.collection("MySmallShop").where({
    //   _openid: "ovxeX5OAaTsA48Eb8JFVaf-EVk1U"
    // }).update({
    //   data: {
    //     price: 99.9
    //   }
    // }).then(res => {
    //   console.log(res)
    // })
    //#endregion

    //#region 8.remove by doc
    // db.collection('MySmallShop').doc(1687016515586).remove({
    //   success: function (res) {
    //     console.log(res)
    //   },
    //   fail: function (err) {
    //     console.log(err)
    //   }
    // })
    //#endregion
  },

  handleAdd(e) {
    debugger
    const {
      fileList
    } = this.data;
    const {
      files
    } = e.detail;

    // 方法1：选择完所有图片之后，统一上传，因此选择完就直接展示
    this.setData({
      fileList: [...fileList, ...files], // 此时设置了 fileList 之后才会展示选择的图片
    });
    console.log(this.data)

    // 方法2：每次选择图片都上传，展示每次上传图片的进度
    // files.forEach(file => this.uploadFile(file))
  },
  onUpload(file) {
    debugger
    file = this.data.fileList[0]
    debugger
    const {
      fileList
    } = this.data;

    this.setData({
      fileList: [...fileList, {
        ...file,
        status: 'loading'
      }],
    });
    const {
      length
    } = fileList;

    const task = wx.cloud.uploadFile({
      cloudPath: Date.now().toString() + '.png',
      filePath: file.url,
      name: 'file',
      formData: {
        user: 'test'
      },
      success: () => {
        this.setData({
          [`fileList[${length}].status`]: 'done',
        });
        Toast({
          selector: '#t-toast',
          context: this,
          message: '图片上传成功',
          theme: 'success',
          direction: 'column',
        })
      },
      fail: (err) => {
        console.log('error:', err)
      }
    });
    task.onProgressUpdate((res) => {
      this.setData({
        [`fileList[${length}].percent`]: res.progress,
      });
    });
  },
  handleRemove(e) {
    const {
      index
    } = e.detail;
    const {
      fileList
    } = this.data;

    fileList.splice(index, 1);
    this.setData({
      fileList,
    });
  },

  uploadFile(e) {
    wx.cloud.uploadFile({
      cloudPath: 'cloud://test-2gwe4zxva4b3e501.7465-test-2gwe4zxva4b3e501-1317572148/' + Date.now().toString() + '.png', // 上传至云端的路径
      filePath: '', // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log(res.fileID)
      },
      fail: console.error
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})