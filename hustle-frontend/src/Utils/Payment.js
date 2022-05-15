import axios from 'axios'

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}



export const makePayment = async (data, packageData, user, callBack) => {

    console.log(data);
    const res = await loadScript(
        'https://checkout.razorpay.com/v1/checkout.js'
    )

    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
    }

    const options = {
        key: 'rzp_test_8H9CZ5cwlOVqJ9',
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: 'Hustle',
        description: 'Make the payment to complete the process',
        image: '',
        handler: async (response) => {
            // Razorpay order detials and order detials are passed to backed
            console.log("=================  Request started     ======================", user);

            try {
                await axios.post("/order/", {
                    buyer_id: user,
                    amount: packageData.price,
                    package_id: packageData.package_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                })
                console.log("///////////////////////////////////////////////////////////////////////////////");
                callBack()
                console.log("*********************************************************************************");
            } catch (error) {
                console.log(error);
            }
            console.log("=================  Resquest completed  ======================");

        },
        prefill: {
            name: 'shahin salim',
            email: 'shahinsalim82@gmail.com',
            phone_number: '8921849804',
        },
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()

}