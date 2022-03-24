import React, {useState} from 'react'
import styled from 'styled-components'
import { PageHero, StripeCheckout, PaystackCheckout } from '../components'

// extra imports
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { useUserContext } from '../context/user_context'


const CheckoutPage = () => {
  const { cart, total_amount, shipping_fee,  } = useCartContext()

  const [isPaystack, setIsPaystack] = useState(true);
  const [isStripe, setisStripe] = useState(false);
  const toggleStripeOn = () => {
    setisStripe(true)
    setIsPaystack(false)

  }
  const toggleStripeOff = () => {
    setisStripe(false)
    setIsPaystack(true)
  }

  if(cart.length < 1 ){
  return <div>
    <PageHero title='checkout' />
      <Wrapper className='page'>
          <div className='empty'>
            <h2>Your Cart is Empty</h2>
            <Link to='/products' className='btn'>
              fill it
            </Link>
          </div>
     </Wrapper>
  
     </div>
     
  }
  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='page'>
        <div className='pwrap'>
          <div className={`${isPaystack ?"payment":"payment2" }`}>
            {isPaystack && <PaystackCheckout />}
            {isPaystack && (
              <button type='button' className='btn' onClick={toggleStripeOn}>
                Pay with Stripe
              </button>
            )}

            {isStripe && <StripeCheckout />}
            {isStripe && (
              <button
                type='button'
                className='btn mt'
                onClick={toggleStripeOff}
              >
                Pay with Paystack
              </button>
            )}
          </div>
        </div>
      </Wrapper>
    </main>
  )
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
  .mt {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .payment {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 10rem;
  }
  .payment2 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
  }
`
export default CheckoutPage
