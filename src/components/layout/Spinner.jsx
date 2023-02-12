import spinnerGif from '../../assets/spinner.gif'

function Spinner() {
  return (
    <div className='w-100 mt-20'>
      <img 
        src={spinnerGif} 
        width={180}
        className='text-center mx-auto' 
        alt='Loading...' />
    </div>
  )
}

export default Spinner