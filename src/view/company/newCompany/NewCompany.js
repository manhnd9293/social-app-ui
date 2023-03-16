import React, {useRef, useState} from 'react';
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import {beClient} from "../../../config/BeClient";

let defaultValues = {
  name: '',
  address: '',
  province: 'Select',
  industry: 'Select',
  introduction: '',
  agree: false
}

const defaultFileName = 'no file is selected';

function NewCompany() {
  const [industries, provinces] = useLoaderData();

  const {register, formState: {errors}, handleSubmit, reset, getValues} = useForm(
    {mode: 'all', defaultValues}
  );

  const defaultLogo = process.env.REACT_APP_DEFAULT_COMPANY_LOGO;
  const [imgSrc, setImgSrc] = useState(defaultLogo);
  const [file, setFile] = useState(null);
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    const response = await beClient.post('/company', {...data});
    const {_id} = response.data;

    if(file) {
      const imageForm = new FormData();
      imageForm.append('file', file);
      await beClient.patch(`/company/${_id}/logo`, imageForm, {
        'Content-type': 'multipart/form-data',
      })
    }

    navigate(`/company/${_id.toString()}/detail`);
  }

  const resetForm = (e) => {
    e.preventDefault();
    reset(
      {...defaultValues},
      {
        keepErrors: false,
        keepDirty: false,
        keepTouched: false,
        keepIsSubmitted: false
      }
    );
    setImgSrc(defaultLogo);
  }

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result));
      const file = e.target.files[0];
      reader.readAsDataURL(file);

      setFile(file);
    }
  }

  async function uploadFile() {
    if (!file) {
      return;
    }
    setLoading(true);
    const data = new FormData();
    data.append('file', file);
    const response = await axios.patch(`http://localhost:5000/employee/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).finally(() => {
      setLoading(false);
    })
    setImgSrc(response.data.url);
  }

  return (
    <div>
      <div className='subtitle'>New company</div>
      <Link to='/company'>
        <button className='button is-link mb-3'>
          <span>List company</span>
        </button>
      </Link>
      <div className='box mt-3' style={{maxWidth: '60rem'}}>

        <div className='subtitle mt-4 has-text-weight-bold'>Add a new company</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field" style={{maxWidth: '50%'}}>
            <label className="label">Company Name</label>
            <div className="control">
              <input className={`input ${errors.name ? 'is-danger' : ''}`}
                     type="text"
                     placeholder="Company Name"
                     {...register('name', {
                         validate: validateCompanyName,
                         required: 'Name is required'
                       },
                     )}
              />
            </div>
            {errors.name && <p className='help is-danger'>{errors.name.message}</p>}
          </div>

          <div className="field">
            <label className="label">Industry</label>
            <div className="control">
              <div className={`select ${errors.industry ? 'is-danger' : ''}`}>
                <select
                  {...register('industry', {
                    validate: validateIndustry,
                    required: 'Industry is required'
                  })
                  }>
                    <option value={'Select'}>Select industry</option>
                    {
                      industries.map((i) => (
                        <option key={i.id} value={i.value}>{i.label}</option>
                      ))
                    }
                </select>

              </div>
            </div>
            {errors.industry && <p className='help is-danger'>{errors.industry.message}</p>}
          </div>

          <div className="field">
            <label className="label">Province</label>
            <div className="control">
              <div className={`select ${errors.province ? 'is-danger' : ''}`}>
                <select
                  {...register('province', {
                    validate: validateProvince,
                    required: 'Province is required'
                  })
                  }>
                    <option value={'Select'}>Select location</option>
                    {
                      provinces.map((p) => (
                        <option key={p.id} value={p.value}>{p.label}</option>
                      ))
                    }
                </select>

              </div>
            </div>
            {errors.province && <p className='help is-danger'>{errors.province.message}</p>}
          </div>

          <div className="field" style={{maxWidth: '60%'}}>
            <label className="label">Address</label>
            <div className="control">
              <input className={`input ${errors.address ? 'is-danger' : ''}`}
                     type="text"
                     placeholder="Address"
                     {...register('address', {
                         validate: validateCompanyName,
                         required: 'Address is required'
                       },
                     )}
              />
            </div>
            {errors.address && <p className='help is-danger'>{errors.address.message}</p>}
          </div>

          <div className='field'>
            <label className="label">Logo</label>
          </div>

          <figure className='image is-64x64 mt-3'>
            <img src={imgSrc}/>
          </figure>

          <div className="file has-name is-info mt-3">
            <label className="file-label">
              <input className="file-input"
                     type="file"
                     name="file"
                     ref={inputRef}
                     onChange={onSelectFile}
              />
              <span className="file-cta">
            <span className="file-icon">
              <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">
              Choose a file…
            </span>
          </span>
              <span className='file-name'>
            {file?.name || defaultFileName}
          </span>
            </label>
          </div>

          <div className="field mt-4">
            <label className="label">Introduction</label>
            <div className="control">
              <textarea className="textarea"
                        placeholder="Introduction"
                        {
                          ...register('introduction')
                        }
              ></textarea>
            </div>
          </div>

          <div className="field mt-4">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox"
                       {...register('agree', {
                         validate: validateAggree
                       })}
                /> I agree to the <a href="#">terms and conditions</a>
              </label>
            </div>
            {errors.agree && <p className='help is-danger'>{errors.agree.message}</p>}
          </div>

          <div className='buttons mt-4'>
            <button className="button is-primary">
              Create
            </button>

            <button className="button" onClick={resetForm}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function loadNewCompanyData() {
  return Promise.all([
    beClient.get(`/company/industries`).then((res) => res.data),
    beClient.get(`/company/provinces`).then((res) => res.data),

  ])
}

function validateCompanyName(value) {

}

function validateProvince(value) {
  if (value === 'Select') {
    return 'Province is require'
  }
}

function validateIndustry(value) {
  if (value === 'Select') {
    return 'Industry is require'
  }
}

function validateAggree(value) {
  if (!value) {
    return 'You must agree with term and condition to create company page'
  }
}

export {loadNewCompanyData};

export default NewCompany;