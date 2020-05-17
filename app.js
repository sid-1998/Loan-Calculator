const form = document.getElementById('loan-form');

form.addEventListener('submit', function(e){
    //hide results
    document.getElementById('results').style.display = 'none';

    //show loader
    document.getElementById('loader').style.display = 'block';

    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

function calculateResults(){
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    //calculation
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value)*12;

    //monthly payment
    const x = Math.pow(1+calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);
        //show results
        document.getElementById('results').style.display = 'block';

        //hide loader
        document.getElementById('loader').style.display = 'none';
    }
    else{
        showerror('Please check your input');
    }
   
}

function showerror(error){

    document.getElementById('loader').style.display = 'none';
    
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);

    setTimeout(clearError, 2000);
}

function clearError(){
    document.querySelector('.alert').remove();
}