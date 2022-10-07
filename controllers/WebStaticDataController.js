const response = require("express");
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

const User = require("../models/User");


// INDEX
const flushCache = (req,res) => {
  myCache.flushAll();
  res.json({
    response:true
  })
}




const navitems = (req, res) => {

    nav = myCache.get( "nav_data" );
    if(nav){
      res.json({
        response:true,
        from:'cache',
        datas:nav
      })
    }else{
      var datas=[
        {name:"Home",url:'/'},
        {name:"Products",url:'/products'},
        {name:"Contact",url:'/contact'},
      ]
      myCache.set( "nav_data", datas, 10000 );
      res.json({
        response:true,
        from:'db',
        datas
      })
    }

};

module.exports = {
  navitems,flushCache
};
