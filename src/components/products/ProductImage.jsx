
const ProductImage = ({title, mediaUrl, width}) => {

  return (
    //zde pak data funcki src mediaId `/media/${id}`
    <img src={mediaUrl} alt={title || "Obrázek"} width={width}/>
  )
}

export default ProductImage