
$(document).ready(function() {
    AOS.init({
        duration: 700,
        once: true
    });

    // adding active class to navitem
    const navbarItem = $('.navbar__item');
    navbarItem.click(function(e){
        $('.navbar__item').removeClass('active');
        $(this).addClass('active');
    });

    // adding scrolling effect to the nav link
    const navbarLink = $('.navbar__link');
    navbarLink.click(function(e){
        const hash  = this.hash;
        if(hash !== ""){
            var decodeHash = decodeURI(hash);
            $('html, body').animate({
                scrollTop: $(decodeHash).offset().top - 75
              }, 100, function(){
              });
        }
    });

    //scroll to inquiry
    $("#banner-button").on('click', function () {
        $('html, body').animate({
            scrollTop: $("#contactus").offset().top - 75
        }, 100);
    })


    // submit the contact us form
    var nameErrorElement = document.getElementById('name_error');
    var companyErrorElement = document.getElementById('company_error');
    var emailErrorElement = document.getElementById('email_error');
    var inquiryTypeErrorElement = document.getElementById('inquiry_type_error');
    var messageErrorElement = document.getElementById('message_error');
    $('#submit_button').on('click', function(e) {
        e.preventDefault();
        nameErrorElement.textContent = "";
        companyErrorElement.textContent = "";
        emailErrorElement.textContent = "";
        messageErrorElement.textContent = "";
        var hasError = false;

        var nameElement = document.getElementById('name');
        var name = nameElement.value;
        if (!name) {
            nameErrorElement.textContent = "ご記入ください";
            hasError = true;
        }

        var companyElement = document.getElementById('company');
        var company = companyElement.value;
        if (!company) {
          companyErrorElement.textContent = "ご記入ください";
          hasError = true;
        }

        var emailElement = document.getElementById('email');
        var email = emailElement.value;
        if (!email) {
            emailErrorElement.textContent = "ご記入ください";
            hasError = true;
        }
        if (email && !ValidateEmail(email)) {
            emailErrorElement.textContent = "メールアドレスが正しくありません";
            hasError = true;
        }

        var inquiryTypeElement = document.getElementById('inquiry-type');
        var inquiryType = inquiryTypeElement.value;
        if (!inquiryType) {
          inquiryTypeErrorElement.textContent = "ご記入ください";
          hasError = true;
        }

        var messageElement = document.getElementById('message');
        var message = messageElement.value;

        if (!message.trim() || message.trim() === "") {
            messageErrorElement.textContent = "ご記入ください";
            hasError = true;
        }

        var telElement = document.getElementById('tel');
        var tel = telElement.value || "";

        if (!hasError) {
            //firebase app in production mode
            var config = {
                apiKey: "AIzaSyC1PRfsNWXoJ6LS4XMPgyXU3566kAq3ptY",
                authDomain: "ready-to-work-d1465.firebaseapp.com",
                databaseURL: "https://ready-to-work-d1465.firebaseio.com",
                projectId: "ready-to-work-d1465",
                storageBucket: "ready-to-work-d1465.appspot.com",
                messagingSenderId: "882070407181",
                appId: "1:882070407181:web:55e017a0cfede34b"
              };

            firebase.initializeApp(config);
            var db = firebase.firestore();
            db.collection("CompanyContact")
                .add({
                    email: email,
                    name: name,
                    company: company,
                    tel: tel,
                    inquiryType: inquiryType,
                    message: message,
                    from: "company_website",
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(function() {
                    $('#contactForm').hide();
                    $('#success__msg').text('お問い合わせいただきありがとうございます。担当者よりご連絡致します。');
                })
                .catch(function(err) {
                    var errorMessage = err && err.message? err.message : "";
                    alert('お問い合わせの登録に失敗しました。お手数をおかけしますが、しばらくしてから再度お試しください。' + errorMessage);
                })
        }

        return false;

    });

    function ValidateEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(mail)) {
            return (true)
        }
        return (false)
    }

    $('#name').on('keyup', function() {
        if ($(this).val().length > 0) {
            nameErrorElement.textContent = "";
        }
    });

    $('#company').on('keyup', function() {
        if ($(this).val().length > 0) {
            companyErrorElement.textContent = "";
        }
    });

    $('#email').on('keyup', function() {
        if ($(this).val().length > 0) {
            emailErrorElement.textContent = "";
        }
    });

    $('#inquiry-type').on('change', function() {
        if ($(this).val().length > 0) {
            inquiryTypeErrorElement.textContent = "";
        }
    });

    $('#message').on('keyup', function() {
        if ($(this).val().length > 0) {
            messageErrorElement.textContent = "";
        }
    });

    $('#name').on('blur', function() {
        var $this = $(this);
        if ($this.val().length > 0) {
            $this.parent().find('label').css('opacity', 0);
        } else {
            $this.parent().find('label').css('opacity', 1);
        }
    });
    $('#email').on('blur', function() {
        var $this = $(this);
        if ($this.val().length > 0) {
            $this.parent().find('label').css('opacity', 0);
        } else {
            $this.parent().find('label').css('opacity', 1);
        }
    });
    $('#message').on('blur', function() {
        var $this = $(this);
        if ($this.val().length > 0) {
            $this.parent().find('label').css('opacity', 0);
        } else {
            $this.parent().find('label').css('opacity', 1);
        }
    });
});
