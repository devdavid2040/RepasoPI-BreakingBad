
const { Router } = require('express');
const axios=require("axios")
const {Character,Occupation}=require("../db")

const router = Router();

const getApiInfo=async ()=>{
    const apiUrl=await axios.get("https://breakingbadapi.com/api/characters")
    const apiInfo= apiUrl.data.map(data=>{
        return{
            id:data.char_id,
            name:data.name,
            image:data.img,
            nickname:data.nickname,
            status:data.status,
            occupation:data.occupation.map(data=>data),
            birthday:data.birthday
        }
    })

return apiInfo
}

const getDbInfo= async ()=>{
    return await Character.findAll({
        include:{
            model:Occupation,
            attributes:["name"],
            through:{
                attributes:[],
            },
        }
    })
} 

const getAllCharacter=async ()=>{
    const apiInfo=await getApiInfo()
    const dbInfo=await getDbInfo()
    const infoAll=[...apiInfo,...dbInfo]

    return infoAll
}



const dataApiOccupations=async()=>{
	const occupationsApi=await axios.get("https://breakingbadapi.com/api/characters")
	const occupations=occupationsApi.data.map(data=>data.occupation).flat()
	const resultApi=occupations.flat()
	const listWithinDuplicate=[...new Set(resultApi)]
	const collection=listWithinDuplicate.map(data=>{
		return {name:data}
	})
	return collection
}



//hacerlo usando todo sequelize solamente usando where como en proyecto countries, no usar JS
router.get("/characters", async (req,res)=>{
    const name=req.query.name
    const charactersAll=await getAllCharacter()
    if(name)
    {
        //mejorar esta parte, mas parametrizable
        const characterName=await charactersAll.filter(data=>data.name.toLowerCase().includes(name.toLowerCase()))

		characterName.length?
		res.status(200).send(characterName):
        res.status(404).send("No exist Character, Sorry")

    }
    else{
        res.status(200).send(charactersAll)
    }

})

router.get("/characaters/:id", async (req, res)=>{
const characterFind=getAllCharacter

res.send(charaterFind)
})


router.get("/occupations", async (req,res)=>{

	const infoOccupationsDB= await Occupation.findAll()

	if(!infoOccupationsDB.length)
	{	
		const collection=await dataApiOccupations()
		await Occupation.bulkCreate(collection)
		res.status(200).send(await Occupation.findAll())
	}
	else{
		res.status(200).send(infoOccupationsDB)
	}


})




router.post("/character", async (req, res)=>{


let {
    name,
    nickname,
    birthday,
    image,
    status,
    createdInDb,
    occupation}=req.body

console.log(name,
    nickname,
    birthday,
    image,
    status,
    createdInDb,
    occupation)

    console.log(req.body.name)


const characterCreated= await Character.create({
    name,
    nickname,
    birthday,
    image,
    status,
    createdInDb
})


const occupationDb=await Occupation.findAll({
    where:{name:occupation}
})

characterCreated.addOccupation(occupationDb)
res.send("Character created")


})

module.exports = router;




