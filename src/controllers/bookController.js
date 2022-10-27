const { count } = require("console")
const BookModel= require("../models/bookModel")
const BookLsModel= require("../models/boolLsModel")
const autherModel= require("../models/autherLs")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const getBooksData= async function (req, res) {
    
    let allBooks= await BookModel.find( )  //normally this is an asynchronous call..but await makes it synchronous
    res.send({msg: allBooks})
}

const bookList=async function(req, res){
    let list = await BookModel.find().select({ bookName: 1, authorName: 1, _id: 0} )
    res.send({msg:list})
}

const getBooksinYear=async function (req, res){
    let yearData=req.body
    let booksyear=await BookModel.find( yearData)
    res.send({msg:booksyear})

    console.log(yearData)
}

const getParticularBooks=async function(req, res){
    let condition= req.body
    let output=await BookModel.find({ $or: [condition]})
    res.send({msg: output})
  
}

const getXINRBooks=async function(req, res){
    let xin= await BookModel.find({"prices.indianPrice":{ $in: ["100","200","500"] }})
    console.log(xin)
    res.send({msg: xin})
}

const getRandomBooks=async function(req, res){
    let random=await BookModel.find({ totalPages: { $gte:  100 },  stockAvailable: true  } )
    res.send({msg:random})
}

const getBookLsCreate=async function(req, res){
    let data=req.body
    let list =await BookLsModel.create(data)
    res.send({msg:list})
}

const getAutherLs=async function(req, res){
    let auther=req.body
    let autherList=await autherModel.create(auther)
    res.send({msg:autherList})
}

const getautherbook=async function (req, res){
        let authorId =await autherModel.findOne({author_name:"Ramanujan"}).select({author_id:1, _id:0})

        let bookName=await BookLsModel.find(authorId).select({bookName:1})

    
      res.send({msg: bookName})
    }
const getUser1= async function (req , res){
    let user=await BookLsModel.findOne({bookName:"Tow states"}).select({author_id:1, _id:0})
    let updatPrice=await BookLsModel.findOneAndUpdate(user,{$set:{prices:100}},{new:true}).select({prices:1, _id:0})

    let autherOfThisBook=await autherModel.findOne(user).select({author_name:1, _id:0})
    res.send({updatedPrice : updatPrice.prices, autherOfThisBook:autherOfThisBook.author_name})

}

const getUserData= async function(req, res){
    let userAll=await BookLsModel.find({prices:{$gte:50, $lte:100}}).select({author_id:1, _id:0})
    let userAll1=await BookLsModel.find({prices:{$gte:50, $lte:100}}).select({bookName:1, _id:0})
    let arr=[];
    for(let i=0; i<userAll.length; i++){
        let arr2=await autherModel.findOne(userAll[i]).select({author_name:1, _id:0});
        arr.push(arr2);
    }
    console.log(arr, userAll1)
    // console.log(userAll1)
}
    // let xx= await autherModel.find({ author_name: "Chetan Bhagat"}).select({ author_name: 0, author_id: 1,} )
    // console.log(xx)
    // let yy= await BookLsModel.find()
    // console.log(yy)
    // const yy=async function(){
        // let value= await BookLsModel.find({author_id: 1})
        // console.log( value)
    
    
    // const Xx=async function (){
    // let yy= await BookLsModel.find({author_id: 1})
    // console.log(Xx)}
// }
    // let allBooks= await BookModel.find( ).count() // COUNT

    // let allBooks= await BookModel.find( { authorName : "Chetan Bhagat" , isPublished: true  } ) // AND
    
    // let allBooks= await BookModel.find( { 
    //     $or: [ {authorName : "Chetan Bhagat" } , { isPublished: true } , {  "year": 1991 }]
    // } ).select( { bookName: 1, authorName: 1, _id: 0})n // SELECT keys that we want

    // let allBooks= await BookModel.find().sort( { sales: -1 }) // SORT

    // PAGINATION 
    // let page= req.query.page
    // let allBooks= await BookModel.find().skip(3 * (page-1)).limit(3)

    // let allBooks= await BookModel.find().sort({ sales: -1 }).skip(3 * (page-1)).limit(3).select({ bookName: 1, authorName: 1, _id: 0} )


    // let allBooks= await BookModel.find({ sales: { $eq:  137 }  }) 
    // let allBooks= await BookModel.find({ sales: { $ne:  137 }  }) 
    // let allBooks= await BookModel.find({ sales: { $gt:  50 }  }) 
    // let allBooks= await BookModel.find({ sales: { $lt:  50 }  }) 
    // let allBooks= await BookModel.find({ sales: { $lte:  50 }  }) 
    // let allBooks= await BookModel.find({ sales: { $gte:  50 }  }) 
    
    // let allBooks= await BookModel.find({     sales : { $in: [10, 17, 82] }     }).count() 
    // sales : { $in: [10, 17, 82] }
    
    // let allBooks= await BookModel.find({     sales : { $nin: [ 17, 82, 137] }     }).select({ sales: 1, _id:0})
    
    //  let allBooks= await BookModel.find({     $and: [{sales : {$gt: 20}} , [sales:  {$lt: 100}]]    })  //sales is between 20 and 100.... sales > 20 AND sales <100
    //  let allBooks= await BookModel.find({     sales : {$gt: 20, $lt: 100}   })  //sales is between 20 and 100.... sales > 20 AND sales <100

    
    //  let allBooks= await BookModel.findById("621c60a6b16c9e6bf2736e33") 
    //  let allBooks= await BookModel.findOne( {sales: 10}) 
    //  let allBooks= await BookModel.find( {sales: 10}) 
    
    

    // //  update (not covered: - findByIdAndUpdate | updateOne )
    // let allBooks= await BookModel.update(   
    //     {  sales: {$gt: 10}  }, //condition
    //     { $set: { isPublished: true} } // the change that you want to make
    //     ) 



    // REGEX
    // let allBooks= await BookModel.find( { bookName:  /^Int/  }) 
    // let allBooks= await BookModel.find( { bookName:  /^INT/i  }) 
    // let allBooks= await BookModel.find( { bookName:  /5$/  }) 
    // let allBooks= await BookModel.find( { bookName:  /.*Programming.*/i  }) 
    
    // ASYNC AWAIT
    
    // let a= 2+4
    // a= a + 10
    // console.log(a)


    // WHEN AWAIT IS USED: - database + axios
    //  AWAIT can not be used inside forEach , map and many of the array functions..BE CAREFUL
    // console.log(allBooks)
    // let b = 14
    // b= b+ 10
    // console.log(b)


module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.bookList= bookList
module.exports.getBooksinYear=getBooksinYear
module.exports.getParticularBooks=getParticularBooks
module.exports.getRandomBooks=getRandomBooks
module.exports.getXINRBooks=getXINRBooks
module.exports.getBookLsCreate=getBookLsCreate
module.exports.getAutherLs=getAutherLs
module.exports.getautherbook=getautherbook
module.exports.getUser1=getUser1
module.exports.getUserData=getUserData