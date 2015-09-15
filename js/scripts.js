$(document).ready(function(){
    $("#add-address").click(function(){
        addAddressFields();
    });
    $("form#new-contact").submit(function(event){
        event.preventDefault();
        var inputtedFirstName = $("input#new-first-name").val();
        var inputtedLastName = $("input#new-last-name").val();
        var newContact = new Contact(inputtedFirstName,inputtedLastName);

        $(".new-address").each(function() {
            var inputtedKind = $(this).find("input.new-kind").val();
            var inputtedStreet = $(this).find("input.new-street").val();
            var inputtedCity = $(this).find("input.new-city").val();
            var inputtedState = $(this).find("input.new-state").val();

            var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedKind);
            newContact.addresses.push(newAddress);
        });

        $("ul#contacts").append("<li><span class='contact'>" +
          newContact.fullName() + "</span></li>");

        $(".contact").last().click(function(){
            $("#show-contact").show();
            $("#show-contact h2").text(newContact.firstName);
            $(".first-name").text(newContact.firstName);
            $(".last-name").text(newContact.lastName);
            $("ul#addresses").text("");
            newContact.addresses.forEach(function(address){
                $("ul#addresses").append("<li>" + address.kind + ": " + address.fullAddress() + "</li>");
            });
        });

        resetFields();

    });
});



function Contact(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.addresses = [];
}

Contact.prototype.fullName = function() {
    return this.firstName + " " + this.lastName;
}

function Address(street, city, state, kind) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.kind = kind
}

Address.prototype.fullAddress = function() {
    return this.street + ", " + this.city + ", " + this.state;
}

function resetFields() {
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
    $("input.new-kind").val("");
}

function addAddressFields () {
    $("#new-addresses").append( '<div class="new-address">' +
                                    '<div class="form-group">' +
                                        '<label for="new-kind">Kind of Address</label>' +
                                        '<input type="text" class="form-control new-kind">' +
                                    '</div>'  +
                                    '<div class="form-group">' +
                                        '<label for="new-street">Street</label>' +
                                        '<input type="text" class="form-control new-street">' +
                                    '</div>' +
                                    '<div class="form-group">' +
                                        '<label for="new-city">City</label>' +
                                        '<input type="text" class="form-control new-city">' +
                                    '</div>' +
                                    '<div class="form-group">' +
                                        '<label for="new-state">State</label>' +
                                        '<input type="text" class="form-control new-state">' +
                                    '</div>'
                               );
}
