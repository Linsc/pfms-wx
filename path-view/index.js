Component({
  externalClasses: ['i-class'],
  properties:{
    list: {
      type: Array,
      value :[],
      observer() {
        this.init();
      }
    },
    rootText:{
      type: String,
      value : 'root'
    },
    title: {
      type: String,
      value: 'key'
    },
    children:{
      type: String,
      value: 'children'
    },
    content:{
      type: String,
      value: 'userList'
    },
    selected:{
      type: String,
      value: ''
    }
  },
  data:{
    outlist: [],
    path: [],
    current: {},
    isRoot: true,
    selected:''
  },
  methods:{
    init(){
      this.data.selected = this.properties.selected;
      this.toRoot();
    },
    toRoot(){
      this.properties.list.forEach((item)=>{
        item.itemShow='';
        item.itemTrans='';
      })
      this.setData({
        outlist: this.properties.list,
        current:{},
        isRoot: true,
        path:[]
      })
    },
    intoNextPath(e){
      var caninto = e.currentTarget.dataset.caninto;
      if(!caninto){
        return
      }
      var item = e.currentTarget.dataset.item;
      var index = e.currentTarget.dataset.index;
      var path = this.data.path;
      path.push(index);
      item = this.initUser(item)
      this.setData({
        path: path,
        current: item,
        outlist: item[this.properties.children],
        isRoot: false
      });
      this.scrollTop();
    },
    backLastPath(e){
      var path = this.data.path;
      var floor = path.length;
      if (floor <= 1){
        this.toRoot()
      }else{
        path.pop();
        console.log('back:' + path)
        var list = this.properties.list;
        var item = {};
        path.forEach((index) =>{
          item = list[index];
          list = item[this.properties.children]
        })
        var isRoot = false;
        if (this.data.path.length <= 0){
          isRoot = true;
        }
        item = this.initUser(item);
        this.setData({
          path: path,
          current: item,
          outlist: list,
          isRoot: isRoot
        })
      }
      this.scrollTop();
    },
    openContent(e){
      var index = e.currentTarget.dataset.index;
      var itemShow = this.data.outlist[index].itemShow
      if (itemShow == null || itemShow == ''){
        this.setData({
          ['outlist[' + index + '].itemShow']: 'item-show',
          ['outlist[' + index + '].itemTrans']:'item-trans90'
        })
      }else{
        this.setData({
          ['outlist[' + index + '].itemShow']: '',
          ['outlist[' + index + '].itemTrans']: ''
        })
      }
    },
    radioChange(e){
      var userId = e.currentTarget.dataset.id;
      var userName = e.currentTarget.dataset.name;
      var index = e.currentTarget.dataset.index;
      var user = {};
      user.userId = userId;
      user.userName = userName;
      var selected = !this.data.current.userList[index].checked;
      user.selected = selected;
      if(selected){
        this.setData({
          selected: userId,
          ['current.userList[' + index + '].checked']: selected
        })
      }else{
        this.setData({
          selected: '',
          ['current.userList[' + index + '].checked']: selected
        })
      }
      this.triggerEvent('click', { value: user });
    },
    initUser(dept){
      var selected = this.data.selected;
      var userList = dept.userList;
      userList.forEach((user) => {
        user.checked = false;
        if (selected == user.userId) {
            user.checked = true;
        }
      })
      return dept
    },
    scrollTop(){
      setTimeout(function () {
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
      }.bind(this), 200)
    }
  }
})