import React, { useState, useEffect } from 'react';
import { Combobox } from "@headlessui/react";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";
import './Register.css';
import {registerUser} from '../services/register.js'
import { verifyEmailDuplicates } from '../services/verifyEmailDuplicates.js';
import { Link, useNavigate} from 'react-router-dom';

countries.registerLocale(en);

const countryList = Object.entries(
  countries.getNames("en", { select: "official" })
).map(([code, name]) => ({
  code,
  name,
  flag: `https://flagcdn.com/w40/${code.toLowerCase()}.png`,
}));

function Register() {
  const navigate = useNavigate(); 

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [relationToRockwell, setRelationToRockwell] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany]= useState('');

  const [selectedCountry, setSelectedCountry] = useState(countryList[0]);
  const [query, setQuery] = useState('');

  useEffect(() => {
      if (!email) return; 
      
      const timeoutId = setTimeout(async () => {
        const exists = await verifyEmailDuplicates(email);
        console.log(exists);
        if(exists){
          setEmailError('This email is already in use.');
        } else {
          setEmailError('');
        }
      }, 500);

      return () => clearTimeout(timeoutId);
  }, [email]);

  const filteredCountries =
    query === ""
      ? countryList
      : countryList.filter((country) =>
          country.name.toLowerCase().includes(query.toLowerCase())
        );

  const handleRegistrar = (evento) => {
    evento.preventDefault();

    const Usuario = {
      name:name,
      country:selectedCountry, 
      email:email,
      password:password,
      phone:phone,
      typeOfUser:relationToRockwell, 
      company:company,
      birthday:birthDate,
    };
    
    registerUser(Usuario, navigate);
    evento.preventDefault(); // do not reload
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegistrar}>
        <h2>Register to play!</h2>
        
        <div className="input-group">
          <label htmlFor="name">Name: *</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Insert your name"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">E-mail: *</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insert your e-mail"
            required
          />
        </div>

        {emailError && <div className="error">{emailError}</div>}

        <div className="input-group">
          <label htmlFor="phone">Phone: </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Insert your phone"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password: * </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Insert your password"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="relationToRockwell">Relation to Rockwell: * </label>
          <select
            id="relationToRockwell"
            value={relationToRockwell}
            onChange={(e) => setRelationToRockwell(e.target.value)}
            required
          >
            // These options are just examples, we need an array of possible relations to rockwell to map here
            <option value="">Select your relation</option>
            <option value="Employee">Employee</option>
            <option value="Client">Client</option>
            <option value="Not related">Not related</option>
          </select>
        </div>

        { relationToRockwell === "Client" &&
          <div className="input-group">
            <label htmlFor="company">Company: </label>
            <input
              type="text"
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Insert your company"
              required
            />
          </div>
        }

        <div className="input-group">
          <label htmlFor="birthDate">Birth Date: </label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max="2026-02-27"
            
          />
        </div>

        <div className="input-group">
          <label>Country:</label>
          {/* anadir aqui una manera de que haciendo clic se abra la lista de paises */}

          <Combobox value={selectedCountry} onChange={setSelectedCountry}>
            <div className="combobox-container">
                
                {selectedCountry && (
                <img
                    src={selectedCountry.flag}
                    alt={selectedCountry.name}
                    className="selected-flag"
                />
                )}

                <Combobox.Input
                className="country-input"
                displayValue={(country) => country?.name}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Select your country"
                />

                <Combobox.Options className="country-options">
                {filteredCountries.map((country) => (
                    <Combobox.Option
                    key={country.code}
                    value={country}
                    className="country-option"
                    >
                    <img
                        src={country.flag}
                        alt={country.name}
                        className="flag"
                    />
                    {country.name}
                    </Combobox.Option>
                ))}
                </Combobox.Options>

            </div>
            </Combobox>
        </div>

        <button type="submit">Register</button>

        <p>Already have an account?  <Link to="/login" className="login-link">Log in</Link></p>
      </form>
    </div>
  );
}

export default Register;