const Post = require('../models/post')
const fs = require('fs');
const { json } = require('express');

/*/ Ajout d'une nouvelle post //
exports.createPost = (req, res, next) => {
  //res.status(201).json({ message: 'Chemin, atteint !'}
  try {
    const postObject = req.body
  
    delete postObject._id;
    delete postObject._userId;

    const post = new Post({
      ...postObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
  
    post.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ message: post}))
  
  }
  catch(error){ 
    res.status(501).json({ message: "format incorrect" })
  }
  
};*/

// Ajout d'une nouvelle post //
exports.createPost = (req, res, next) => {
  try {
    const postObject = 

    // Ajout AVEC Image //
    req.file ? {
      ...JSON.parse(req.body.post),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } 

    // Ajout SANS Image //
    : { 
      ...req.body 
    }
  
    delete postObject._id;
    delete postObject._userId;

    const post = new Post({
      ...postObject,
      userId: req.auth.userId,
    })
  
    post.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({error}))
  
  }
  catch(error){ 
    res.status(501).json({ message: "format incorrect" })
  }
  
};

// Changer un post //
exports.modifyPost = (req, res, next) => {

  const postObject = 

  // Modification AVEC Image //
  req.file ? {
    ...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } 

  // Modification SANS Image //
  : { 
    ...req.body 
  }

  delete postObject._userId;
  Post.findOne({_id: req.params.id})
    .then((post) => {

      if (post.userId != req.auth.userId) {
        res.status(401).json({ message : 'Not authorized'})
      } 

      else {
        Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
          .then(() => res.status(200).json({message : 'Post modifié!'}))
          .catch(error => res.status(401).json({ error }))
      }

    })

    .catch((error) => {res.status(400).json({ error })})

};

// Supprimer un post //
exports.supprimPost = (req, res, next) => {

  Post.findOne({ _id: req.params.id})
    .then(post => {

      if (post.userId != req.auth.userId) {
        res.status(401).json({message: 'Not authorized'})
      } 

      else if (post.imageUrl) {
        const filename = post.imageUrl.split('/images/')[1]
        fs.unlink(`images/${filename}`, () => {
          
          Post.deleteOne({_id: req.params.id})
            .then(() => { res.status(200).json({message: 'Post supprimé !'})})
            .catch(error => res.status(401).json({ error }))

        })
      }

      else {
          
        Post.deleteOne({_id: req.params.id})
          .then(() => { res.status(200).json({message: 'Post supprimé !'})})
          .catch(error => res.status(401).json({ error }))
    
      }

    })

    .catch( error => {res.status(500).json({ error })})

};

// Afficher un post //
exports.findOnePost = (req, res, next) => {

  Post.findOne({ _id: req.params.id })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }))

};

// Afficher tout les posts //
exports.findAllPosts = (req, res, next) => {

  Post.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }))

};

// Donner son opinion sur un post //
exports.like = (req, res, next) => {

  Post.findOne({ _id: req.params.id })
    .then(post => {

      // Si l'utilisateur n'a pas encore aimé un post //
      if(post.usersLiked.indexOf(req.body.userId) == -1) {
        
        // L'utilisateur aime le post //
        if(req.body.like == 1) { 
          post.usersLiked.push(req.body.userId);
          post.likes += req.body.like;
        } 

      }

      // Si l'utilisateur veut annuler son "like"
      if(post.usersLiked.indexOf(req.body.userId) != -1 && req.body.like == 0) {
        const likesUserIndex = post.usersLiked.findIndex(user => user === req.body.userId)
        post.usersLiked.splice(likesUserIndex, 1)
        post.likes -= 1;
      }

      post.save();
      res.status(201).json({ message: 'Like / Dislike mis à jour' })
    
    })

    .catch(error => res.status(500).json({ error }))
    
};