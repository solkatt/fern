import api from '../api'

import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import '../style/Common.scss'


function FileUpload(props) {


    const [Images, setImages] = useState([])



    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        api.uploadProductImage(formData, config)
            .then(response => {
                if (response.data.success) {

                    // console.log('ONDROP RESPONSE:', response.data.imageUrl)

                    setImages([...Images, response.data.imageUrl])
                    // setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.imageUrl])

                } else {
                    alert('Failed to save the Image in Server')
                    console.log(response)
                }
            })
    }

const onDelete = (image) => {

    const currentIndex = Images.indexOf(image)

    let newImages = [...Images]

    newImages.splice(currentIndex, 1)

    setImages(newImages)
    props.refreshFunction(newImages)


    const payload = {
    image: image,
    }

    const productID = 'temp';

        api.deleteProductImage(productID, payload).then((res) => {


        alert('Product successfully deleted image')
        // this.props.history.push('/')
        console.log(res.data);
        // console.log(this.state.images)

    }, (err) => {
        console.log(err)
    })


}





    return (

        <div className='fileupload-container'>
            <Dropzone onDrop={onDrop} multiple={false} maxSize={8000000000} >
                {({ getRootProps, getInputProps }) => (
                    <div className='fileupload-drop' {...getRootProps()}>

                        <input {...getInputProps()} />
                        <h2 > + </h2>
                        <h4>Drop or click to add image</h4>
                    </div >
                )}
            </Dropzone>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '350px', height: '240px', overflow: 'hidden' }}>


            {    Images.map((image, index) => (
                <div onClick={() => onDelete(image)} key={index}>
                    <img className='fileupload-image' src={`${image}`} alt={`productImg-${index}`} key={index}/>
                </div>

            ))}

            </div>
        </div>
    )
}

export default FileUpload