/* FUNCIÓN PARA REDIMENSIONAR IMÁGENES DE LA CABECERA Y EL PIE DE LAS DISTINTAS SECCIONES */
function redimensionar_img ($destino)
{
 /* Puede que la imagen subida tenga un tamaño no adecuado para la web, por lo 
 que, una vez subida la imagen, la redimensionamos. La función getimagesize 
 devuelve un array con los datos de una imagen. En la primera posición del 
 array está el ancho de la imagen, en la segunda 
 el alto y en la tercera el tipo.
 El valor de tipo es un número:
 1- Imagen gif
 2- Imagen jpg
 3- Imagen png */
 
 list($ancho, $alto, $tipo) = getimagesize($destino);
 
 /* Ancho y alto máximos para la imagen */
 $anchura=960;
 $hmax=750; 
 
 /* Dependiendo del tipo de fichero generamos una copia de la imagen con las funciones 
 imagecreatefromgif, imagecreatefromjpeg o imagecreatefrompng.*/
 switch ($tipo)
 {
  case 1:
   $nueva_img = imagecreatefromgif($destino);
   break;
  case 2:
   $nueva_img = imagecreatefromjpeg($destino);
   break;
  case 3:
   $nueva_img = imagecreatefrompng($destino);
   break;      
 }
 
 /* Determinamos las nuevas medidas de las imagen */
 $ratio = ($ancho / $anchura);
 $altura = ($alto / $ratio);
 
 if($altura>$hmax)
 {
  $anchura_temp=$hmax*$anchura/$altura;
  $altura=$hmax;
  $anchura=$anchura_temp;
 }
 
 /* Creamos una nueva imagen de color con el nuevo ancho y alto*/
 $img_temporal = imagecreatetruecolor($anchura,$altura);
 
 /* La función imagecopyresampled copia y cambia el tamaño de parte de 
 una imagen, redimensionándola.
 Pasamos el ancho y el alto originales para que se redimensione la 
 imagen original entera */
 imagecopyresampled($img_temporal, $nueva_img, 0, 0, 0, 0, $anchura, $altura, $ancho, $alto);
 
 /* Dependiendo del tipo del archivo original imprime la imagen temporal encima del original */
 switch ($tipo)
 {
  case 1:
   /*header("Content-type: image/gif"); imagegif($img_temporal[$i]);*/
   imagegif($img_temporal, $destino);
   break;
  case 2:
   /*header("Content-type: image/jpeg");imagejpeg($img_temporal[$i]);*/
   imagejpeg($img_temporal, $destino);
   break;
  case 3:
   /*header("Content-type: image/png");imagepng($img_temporal[$i]);*/
   imagepng($img_temporal, $destino);
   break;
 }
 
 /* Destruimos la imagen temporal para evitar ocupar sitio en el servidor */
 imagedestroy($img_temporal);
}
/* FIN DE LA FUNCIÓN PARA REDIMENSIONAR IMÁGENES */
 