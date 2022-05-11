const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Library = mongoose.model('Library');

router.get('/', (req, res) => {
    res.render("library/addOrEdit", {
        viewTitle: "Indian Central Library"
    });
});

router.post('/', (req, res) => {
    //console.log(req.body)
    console.log(req.body)
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var library = new Library();
    library.bookName = req.body.bookName;
    library.author = req.body.author;
    library.bdomain = req.body.bdomain;
    library.yob = req.body.yob;
    library.bookA = req.body.bookA;

    //console.log(req.body.bookA === "True")

    if(req.body.bookA === "True" || req.body.bookA === "False"){

       
        library.save((err, doc) => {
            if (!err)
                res.redirect('library/list');
                
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("library/addOrEdit", {
                        viewTitle: "Insert Library",
                        library: req.body
                    });
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });

    }else{
        res.render("library/addOrEdit", {
            viewTitle: "Insert Book",
            library: req.body
        });
    }

    
}

function updateRecord(req, res) {

    
    //console.log("TEST")
    Library.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('library/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("library/addOrEdit", {
                    viewTitle: 'Update Library',
                    library: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Library.find((err, docs) => {
        if (!err) {
            res.render("library/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving library list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'bookName':
                body['bookNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['authorError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    
    Library.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("library/addOrEdit", {
                viewTitle: "Update Library",
                library: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Library.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/library/list');
        }
        else { console.log('Error in library delete :' + err); }
    });
});

module.exports = router;