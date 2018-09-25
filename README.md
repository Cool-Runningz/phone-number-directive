# phone-number-directive

This is an example of a AngularJS (1.6) directive created utilizing a smaller package JavaScript package I found called [google-libphonenumber](https://github.com/ruimarinho/google-libphonenumber). According to the README for that package, it is an *"...up-to-date and reliable Google's libphonenumber package for node.js. Zero dependencies."*

The directive restricts users to entering in digits only and provides the user an error message based on phone number length or if the number entered is incorrect based on the  selected country code. 

# Examples
Formatting a valid phone number
![Image of Valid phone number formatting](https://github.com/Cool-Runningz/phone-number-directive/blob/master/screenshots/Valid%20phone%20format.png)

Error handling for an invalid phone number based on country code
![Image of invalid phone number CC](https://github.com/Cool-Runningz/phone-number-directive/blob/master/screenshots/Invalid%20phone%20number%20CC.png)

Error handling for a phone number entered with an invalid # of digits
![Images of invalid phone length](https://github.com/Cool-Runningz/phone-number-directive/blob/master/screenshots/Invalid%20phone%20length.png)
