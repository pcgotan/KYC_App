# KYC APP

## Overview

Built a Super-Modular Digital KYC ​single page Application using React framework which can be used by any kind of financial institution to do the KYC after the user registration is complete.

## Demo

![Demo](https://user-images.githubusercontent.com/45638058/80860521-abdabe80-8c85-11ea-9452-2628fce6d5a2.gif)

## Background

KYC means “​ **Know Your Customer​** ”. It is a process by which financial institutions obtain information about the identity and address of the customers. This process helps to ensure that financial services are not misused. Financial institutions are now required by the RBI norms to have their customers KYC process completed before allowing them complete access to all of their services.

### Documents required to do the KYC:

1. Basic customer details like name, DOB and gender
2. Latest photo
3. ID and Address Proofs like Aadhaar, Voter ID, Driving License, Passport and PAN.

## Specifications

The flow of app consists of ​ 4 modules​ , authentication, customer details, selfie, and govt. ID.

-   **Authentication​** : Designed and developed a minimal login page where users are able to login if they already have registered.
-   **Customer Details**: The full name, date of birth & gender of the customer.
-   **Selfie**: ​ A front selfie camera ​inside the browser to take a photo. Also an overlay on top of the camera interface to guide the user where they have to put their face.
-   **Government ID**: ​ Asking the user to select the government ID from Aadhaar, Voter ID, Driving License, Passport and PAN. After selecting, user is asked to click the photo of front and back(if applicable) side of their selected ID.A portrait overlay on top of camera interface is shown to guide the user in taking a clear photo of their IDs.

## Flow

<span style="color:#4BAD4F"> Authentication ​ => ​ Customer details ​ => Selfie => ​ Govt. ID ​ => ​ Success</span>.

## Features

-   Post login pages are forced to open in a Mobile browsers because they support both front and back camera inside the browser. Error is showing if the browser is not supported.
-   On clicking refresh after logging in, state of the page is persisted
-   All input fields have a proper validation
-   Saving the customer details in session storage
-   Asking user to give access for the camera before the selfie page
-   showing tips to take a better photo
-   A navigation bar is also in action to navigate between pages if the user feels any need to edit the filled details
-   To mock the backend A dummy Rest API is created using JSON server
-   Dark theme is enhancing the user's experience
