Component({
  externalClasses: ['i-class'],
  properties:{
    list: {
      type: Array,
      value :[],
      observer() {
        this.initView();
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
    }
  },
  data:{
    outlist: [],
    path: [],
    current: {},
    isRoot: true,
    selectList:[]
  },
  methods:{
    initView(){
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
      this.setData({
        path: path,
        current: item,
        outlist: item[this.properties.children],
        isRoot: false
      })
      console.log('into:' + this.data.path)
    },
    backLastPath(e){
      var path = this.data.path;
      var floor = path.length;
      if (floor <= 1){
        this.initView()
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
        this.setData({
          path: path,
          current: item,
          outlist: list,
          isRoot: isRoot
        })
      }
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
      var user = {};
      user.userId = userId;
      user.userName = userName
      this.triggerEvent('click', { value: user });
    }
  }
})