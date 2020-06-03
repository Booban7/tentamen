get = (req, res, next) => {
  req.models.Book.find().then((books) => {
      return res.send(books);
    }).catch((error) => next(error))
}

post = (req, res, next) => {
  req.models.Book.create({
    ISBN: req.body.ISBN,
    Title: req.body.Title,
    Author: req.body.Author,
    Price: req.body.Price,
    SellerEmail: req.body.SellerEmail,
    Used: req.body.Used,
    Location: {
      City: req.body.Location.City,
      Street: req.body.Location.Street
    }
  }).then((books) => {
    return res.status(201).send(books)
  }).catch((error) => {
    next(error)
  })
}

patch = (req, res, next) => {
  console.log(dotify(req.body))
  req.models.Book.findByIdAndUpdate(req.params.id,
    {
      $set: dotify(req.body)
    },
    {
      returnNewDocument: true,
      new: true,
      upsert: true,
      runvalidators: true,
    }).then((status) => {
      console.log("status: ", status)
      if (status.upserted) {
        res.status(201)
      } else if (status.nModified) {
        res.status(200)
      } else {
        res.status(204)
      }
      req.models.Book.findById(req.params.id).then((book) => {
        res.send(book)
      })
    }).catch((error) => next(error))
}


deleteBook = (req, res, next) => {
  req.models.Book.findByIdAndDelete(req.params.id).then((deleted)=> {
    if (deleted)
      return res.send(deleted).status(200)
    res.sendStatus(204)
  }).catch((error) => next(error))
}

getById = (req, res, next) => {
  req.models.Book.findById(req.params.id).then((book) => {
    return res.send(book);
  }).catch((error) => next(error))
}

module.exports = {
  get,
  post,
  deleteBook,
  patch,
  getById,
}