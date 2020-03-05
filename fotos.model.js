var fs = require('fs');
var fileToSave = 'security.json';
var userModel = {};
var userCollection = [];

function writeToFile(){
  var serializedJSON = JSON.stringify(userCollection);
  fs.writeFileSync(fileToSave, serializedJSON, { encoding: 'utf8' });
  return true;
}

function openFile(){
  try{
  var serializedJSON = fs.readFileSync(fileToSave,{encoding:'utf8'});
  userCollection = JSON.parse(serializedJSON);
  } catch(e){
    console.log(e);
  }
}


var userTemplate = {
    fotosId:'',
    fotosTitle:"",
    fotosUrl:"",
    fotosThumbnail:"",
    fotosAlbum: ""
}

openFile();

userModel.getAll = ()=>{
    return userCollection;
}

userModel.getById = (id)=>{
    var filteredUsers = userCollection.filter(
        (o)=>{
            return o.fotosId === id;
        }
    );
    if(filteredUsers.length){
        return filteredUsers[0];
    }else{
        return null
    }
}



userModel.addNew = ( {fotosTitle1,fotosAlbum1,fotosUrl1,fotosThumbnail1} )=>{
    var newUser = Object.assign(
    {},
    userTemplate,
    {
        fotosTitle:fotosTitle1,
        fotosAlbum:fotosAlbum1,
        fotosUrl:fotosUrl1,
        fotosThumbnail:fotosThumbnail1
    }
  );
    newUser.fotosId = userCollection.length + 1;

    userCollection.push(newUser);
    writeToFile();
    return newUser;
}


userModel.update = (id, { fotosurl1, fotosthumbnail1 })=>{
    var updatingUser = userCollection.filter(
      (o, i)=>{
        return o.fotosid === id;
      }
    );
    if(updatingUser && updatingUser.length>0){
      updatingUser = updatingUser[0];
    } else {
      return null;
    }
    var updateUser = {};
    var newUpdatedCollection = userCollection.map(
      (o, i)=>{
        if(o.fotosid === id){
          updateUser = Object.assign({},
             o,
            { fotosurl: fotosurl1, fotosthumbnail:fotosthumbnail1}
          );
          return updateUser;
        }else{
          return o;
        }
      }
    );
    userCollection = newUpdatedCollection;
    writeToFile();
    return updateUser;
}



userModel.deleteByCode = (id)=>{
  var newCollection = [];
  newCollection = userCollection.filter(
    (o)=>{
      return o.fotosid !== id;
    }
  );
  userCollection = newCollection;
  writeToFile();
  return true;
}





userCollection.push(
    Object.assign(
        {},
        userTemplate,
        {
            fotosid:1,
            fotostitle:"PruebaNombre",
            fotosurl:"www.pruebadeUrl.com",
            fotosthumbnail:"www.THUMBNAIL.com",
            fotosalbum: "Album"
        }
    )
);



module.exports = userModel;
