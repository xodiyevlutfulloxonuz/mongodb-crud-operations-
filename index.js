const mongoose=require('mongoose')

async function main(){
    let db=await mongoose.connect('mongodb://localhost/play')
    const  courseSchema=new mongoose.Schema({
        name:String,
        author:String,
        tags:[String],
        date:{type:Date, default:Date.now()},
        isPublished:Boolean 
    })
    const dbModel= db.model('users',courseSchema)
    return dbModel
   
    
}


async function createUser(){
    let dbModel=await main()
    const user=await dbModel.create({name:"Flutter course", author:'Mosh',tags:['node','backend'],isPublished:true})
    await user.save()
    console.log(user);
}

//createUser()

async function getAllUsers(){
    let dbModel=await main()
    let allUsers= await dbModel.find({author:'Mosh',isPublished:true})
    .limit(10)
     .sort({name:1})
     .select({name:1, tags:1,author:1})
     .or({author:'Mosh',isPublished:true})
      .count()
    console.log(allUsers)

    
}

//getAllUsers()

async function deleteUser(id){
    let dbModel=await main()
    let deletUser= await dbModel.findByIdAndDelete(id)
    console.log("deleted user ")
}
//deleteUser('612745985c13ccdcd2534f09')

async function updateUser(id){
    const dbModel=await main()
    const user=await dbModel.findByIdAndUpdate(id,{
        $set:{
            author:"Developer Lutfulla",
            isPublished:true 
        }
    })
    
    console.log(user)
    
}
//updateUser('612745985c13ccdcd2534f09')

async function removeUser(id){
    let dbModel=await main()
    let deleteUser=await dbModel.deleteOne({_id:id})

    console.log(deleteUser)

   
}
removeUser('61275ca0006acfe4aecd5e7d')