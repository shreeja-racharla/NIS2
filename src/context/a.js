
'use client';

import React from 'react';

interface Product {
  id: number;
  title: string;
  subscriptionType: string;
  price: number;
}

export default function PaymentPage() {
  const products: Product[] = [
    {
      id: 1,
      title: '5 Resumes - C0005R',
      subscriptionType: 'One Time Subscription IN',
      price: 19,
    }
  ];

  const subtotal = products.reduce((acc, product) => acc + product.price, 0);

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      display: 'flex',
      gap: '40px',
      alignItems: 'flex-start'
    }}>
      {/* Products Section */}
      <div style={{ flex: 2 }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#2d3748' }}>
          Plan
        </h1>
        
        {products.map((product) => (
          <div key={product.id} style={{ 
            borderBottom: '1px solid #e2e8f0', 
            padding: '15px 0'
          }}>
            <h2 style={{ 
              fontSize: '16px', 
              fontWeight: 600, 
              marginBottom: '5px'
            }}>
              {product.title}
            </h2>
            <p style={{ 
              fontSize: '14px', 
              color: '#718096',
              marginBottom: '10px'
            }}>
              {product.subscriptionType}
            </p>
          </div>
        ))}
      </div>

      {/* Payment Summary */}
      <div style={{ 
        backgroundColor: '#f7fafc', 
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          marginBottom: '15px',
          color: '#2d3748'
        }}>
          Payment Summary
        </h2>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '10px'
        }}>
          <span>Subtotal:</span>
          <span>¥7,999.18</span>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          fontWeight: 'bold'
        }}>
          <span>Order total:</span>
          <span>¥7,999.18</span>
        </div>
      </div>

      {/* Payment Method */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          marginBottom: '15px',
          color: '#2d3748'
        }}>
          Payment method: *
        </h2>
        <div style={{ 
          border: '1px solid #cbd5e0', 
          padding: '15px',
          borderRadius: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="radio" name="r1" checked style={{ accentColor: '#4299e1' }} />
            <span style={{ fontWeight: 500 }}>Stripe</span>
            <input type="radio" name="r1" checked style={{ accentColor: '#4299e1' }} />
            <span style={{ fontWeight: 500 }}>RazorPay</span>
          </div>
          <p style={{ 
            fontSize: '14px', 
            color: '#718096',
            marginTop: '10px'
          }}>
            Pay securely by Credit or Debit card or Internet Banking through Stripe or RazorPay
          </p>
        </div>
      </div>

      {/* Customer Information */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          marginBottom: '15px',
          color: '#2d3748'
        }}>
          CUSTOMER INFORMATION
        </h2>
        <p style={{ color: '#718096', marginBottom: '15px' }}>
          Order information will be sent to your account e-mail listed below.
          <br />
          <label>Email address: </label>
          <input type='text' value="shreeja.r@gmail.com"></input>
          {/* E-mail address: shreeja.r@kiritikahire.com */}
        </p>
      </div>

      {/* Billing Information */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          marginBottom: '15px',
          color: '#2d3748'
        }}>
          BILLING INFORMATION
        </h2>
        <p style={{ color: '#718096', marginBottom: '15px' }}>
          Enter your billing address and information here.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              *First name: 
              <input 
                type="text" 
                defaultValue="Shreeja" 
                style={{ 
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #cbd5e0',
                  borderRadius: '4px'
                }}
              />
            </label>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Last name: 
              <input 
                type="text" 
                defaultValue="Racharla" 
                style={{ 
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #cbd5e0',
                  borderRadius: '4px'
                }}
              />
            </label>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Street Address: 
              <input 
                type="text" 
                defaultValue="305 b wing meridian tower thane west" 
                style={{ 
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #cbd5e0',
                  borderRadius: '4px'
                }}
              />
            </label>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              City: 
              <input 
                type="text" 
                defaultValue="Thane" 
                style={{ 
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #cbd5e0',
                  borderRadius: '4px'
                }}
              />
            </label>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              State/Province: 
              <input 
                type="text" 
                defaultValue="Maharashtra" 
                style={{ 
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #cbd5e0',
                  borderRadius: '4px'
                }}
              />
            </label>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Postal Code: 
              <input 
                type="text" 
                defaultValue="421302" 
                style={{ 
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #cbd5e0',
                  borderRadius: '4px'
                }}
              />
            </label>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>
              Phone Number: 
              <input 
                type="tel" 
                defaultValue="9876543210" 
                style={{ 
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #cbd5e0',
                  borderRadius: '4px'
                }}
              />
            </label>
          </div>

        </div>
      </div>

      {/* Coupon Section */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 'bold', 
          marginBottom: '15px',
          color: '#2d3748'
        }}>
          COUPON DISCOUNT
        </h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Type Here" 
            style={{ 
              flex: 1,
              padding: '8px',
              border: '1px solid #cbd5e0',
              borderRadius: '4px'
            }}
          />
          <button style={{ 
            backgroundColor: '#4299e1',
            color: 'white',
            padding: '8px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Apply to order
          </button>
        </div>
      </div>

      {/* Review Order Button */}
      <button
        style={{
          width: '100%',
          backgroundColor: '#4299e1',
          color: 'white',
          padding: '12px',
          fontSize: '16px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        Review order
      </button>
    </div>
  );
}