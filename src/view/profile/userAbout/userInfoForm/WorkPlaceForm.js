import React, {useState} from 'react';

function WorkPlaceForm({work, onSave, onCancel}) {
  const [company, setCompany] = useState(work?.company);
  const [position, setPosition] = useState(work?.position);
  const [city, setCity] = useState(work?.city);
  const [description, setDescription] = useState(work?.description);
  // debugger
  function handleSaveWork() {
    onSave({company, position, city, description});
  }

  return (
    <div>
      <div className="field">
        <label className="label">Company</label>
        <div className="control">
          <input className="input" type="text" placeholder="Company Name"
                 value={company}
                 onChange={event => setCompany(event.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Position</label>
        <div className="control">
          <input className="input" type="text" placeholder="Position"
                 value={position}
                 onChange={event => setPosition(event.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">City/town</label>
        <div className="control">
          <input className="input" type="text" placeholder="City / town"
                 value={city}
                 onChange={event => setCity(event.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Description</label>
        <div className="control">
          <textarea className="textarea has-fixed-size" type="text"
                    placeholder="Description"
                    rows={3}
                    value={description}
                    onChange={event => setDescription(event.target.value)}
          />
        </div>
      </div>

      <div className="field is-grouped mt-3">
        <div className="control">
          <button className="button is-link is-light is-small has-text-weight-bold"
                  onClick={onCancel}
          >Cancel</button>
        </div>
        <div className="control">
          <button className={`button is-info is-small has-text-weight-bold`}
                  disabled={!company}
                  onClick={handleSaveWork}
          >Save</button>
        </div>
      </div>
    </div>
  );
}

export default WorkPlaceForm;