class Image{
    constructor(id,url,name,type){
        this.id=id;
        this.url=url;
        this.name=name;
        this.type=type;
    }
    setMetaData(metadata){
        this.meta=metadata;
    }
}

module.exports=Image;