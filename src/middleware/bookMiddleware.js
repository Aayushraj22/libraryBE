const bookDataValidation = ( req, res, next ) => {
    const book = req.body 
    
    const { name, author, price, publishedAt, description, imgurl, copies, language, genre } = book

    if( !name || !name.trim() || !author || !(author instanceof Object) || !price || !publishedAt || !description || !description.trim() || !imgurl || !copies || !copies.total || !copies.available || !language || !language.trim() || !genre || !genre.trim() ) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid data'
            })
        }

    try {
        const url = new URL(imgurl)
    } catch (error) {
        console.log('error: ',error.message)
        return res.status(400).json({
            status: 400,
            message: 'Invalid url'
        }) 
    }

    next()
}

export { bookDataValidation }
