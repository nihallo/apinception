import supertest from 'supertest';
const request = supertest('http://localhost:5000/');
import { expect } from 'chai';

describe("Travel Quotation API V1 Test", function() {

    var userDetails={
        "email":"a@b.com",
        "password":"password"
    }
    var token = null;
    before(function(done) {
        request
          .post('user/signin')
          .send(userDetails)
          .end(function(err, res) {
            if(err) return done(err);
            console.log('whats in the res',res)
            token = res.body.object.token; // Or something
            return done();
          });
      });

    describe('/POST travel request', () => {
        it('all processing steps should all finish', () => {
            let travelRequest = {
                "apiCode": "TRAVEL_QUO",
                "apiRequestData": [
                    {
                        "companyCode": "SIN",
                        "partnerCode": "AG001",
                        "tripType": "SingleTrip",
                        "groupType": "Individual",
                        "periodOfInsuranceFrom": 1596028071000,
                        "periodOfInsuranceTo": 1596028071000,
                        "noOfDays":2,
                        "dateOfBirth":500821671000,
                        "noOfPersonTravelling": 2,
                        "noOfAdult": 1,
                        "noOfChild": 1,
                        "promoCode": "20DISC",
                        "countryCodes": [
                            {
                                "countryCode": "ARG"
                            }
                        ]
                    }
                ]
            };
            const expectedBodyData = [
                    {
                        "companyCode": "SIN",
                        "partnerCode": "AG001",
                        "tripType": "SingleTrip",
                        "groupType": "Individual",
                        "periodOfInsuranceFrom": 1596028071000,
                        "periodOfInsuranceTo": 1596028071000,
                        "noOfDays": 2,
                        "dateOfBirth": 500821671000,
                        "noOfPersonTravelling": 2,
                        "noOfAdult": 1,
                        "noOfChild": 1,
                        "promoCode": "20DISC",
                        "countryCodes": [
                            {
                                "countryCode": "ARG",
                                "areaCode": "A"
                            }
                        ],
                        "ageLastBirthday": 35,
                        "VALIDATION": [
                            {
                                "validationStepName": "checkk whether age is more than 17",
                                "errorType": "WARNNING",
                                "errorMessage": "Age is more than 17 years old."
                            },
                            {
                                "validationStepName": "checkk age again",
                                "errorType": "ERROR",
                                "errorMessage": "Age is more than 17 years old."
                            }
                        ],
                        "promoDiscount": 20,
                        "premiumDetails": [
                            {
                                "_id": "5f12aed08f9997085c963929",
                                "Area": "C",
                                "Plan": "Standard",
                                "Premium": 55,
                                "gstAmount": 3.85
                            },
                            {
                                "_id": "5f12aed08f9997085c963931",
                                "Area": "C",
                                "Plan": "Elite",
                                "Premium": 72,
                                "gstAmount": 5.04
                            },
                            {
                                "_id": "5f12aed08f9997085c9638f9",
                                "Area": "A",
                                "Plan": "Standard",
                                "Premium": 32,
                                "gstAmount": 2.24
                            },
                            {
                                "_id": "5f12aed08f9997085c963919",
                                "Area": "B",
                                "Plan": "Elite",
                                "Premium": 52,
                                "gstAmount": 3.64
                            },
                            {
                                "_id": "5f12aed08f9997085c963909",
                                "Area": "A",
                                "Plan": "Premier",
                                "Premium": 62,
                                "gstAmount": 4.34
                            },
                            {
                                "_id": "5f12aed08f9997085c963921",
                                "Area": "B",
                                "Plan": "Premier",
                                "Premium": 80,
                                "gstAmount": 5.6
                            },
                            {
                                "_id": "5f12aed08f9997085c963911",
                                "Area": "B",
                                "Plan": "Standard",
                                "Premium": 38,
                                "gstAmount": 2.66
                            },
                            {
                                "_id": "5f12aed08f9997085c963901",
                                "Area": "A",
                                "Plan": "Elite",
                                "Premium": 44,
                                "gstAmount": 3.08
                            },
                            {
                                "_id": "5f12aed08f9997085c963939",
                                "Area": "C",
                                "Plan": "Premier",
                                "Premium": 100,
                                "gstAmount": 7
                            }
                        ],
                        "quotationNumber": "f5751760-2246-4012-8d02-4d1b998d5e9e"
                    }
                ];
            request
                .post('apiservice')
                .set('Authorization', 'Bearer ' + token)
                .send(travelRequest)
                .end((err,res)=>{
                    expect(res.body.success).to.be.equal(true);
                    expect(res.body.data[0].promoCode).to.be.equal('20DISC');

                });
        });
    });
});