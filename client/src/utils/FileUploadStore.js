import api from '../api'

import React, { useState } from 'react'
import Dropzone from 'react-dropzone'

function FileUpload(props) {


    const [Images, setImages] = useState([])



    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        api.uploadStoreImage(formData, config)
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

        api.deleteStoreImage(productID, payload).then((res) => {


        alert('Store successfully deleted image')
        // this.props.history.push('/')
        console.log(res.data);
        // console.log(this.state.images)

    }, (err) => {
        console.log(err)
    })


}





    return (

        <div>
        
            <Dropzone onDrop={onDrop} multiple={false} maxSize={8000000000} >
                {({ getRootProps, getInputProps }) => (
                    <div style={
                        {
                            width: '300px',
                            height: '240px',
                            border: '1px solid lightgray',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} {...getRootProps()}>

                        <input {...getInputProps()} />
                        <h2 > + </h2>
                    </div >
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>


            {    Images.map((image, index) => (
                <div onClick={() => onDelete(image)} key={index}>
                    <img style={{minWidth: '300px', width: '300px', height: '240px' }} src={`${image}`} alt={`productImg-${index}`} key={index}/>
                </div>

            ))}

            </div>
        </div>
    )
}

export default FileUpload