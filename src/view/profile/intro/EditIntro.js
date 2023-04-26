import React from 'react';
import BaseModal from "../../../common/modal/BaseModal";

function EditIntro({onClose}) {
  return (
    <BaseModal modalName={`Edit details`}
               closeModal={onClose}
    >
      <div className={`p-3`}>
        <div>
          <div className={`has-text-weight-bold`}>Customize your intro</div>
          <div>Details you select will be public.</div>
        </div>
        <div className={`mt-3`}>
          <div className={`has-text-weight-bold`}>Work</div>
          <div className={`button is-outlined is-small is-info is-rounded mt-3`}>
            <span className={`icon`}>
              <i className="fa-solid fa-plus"></i>
            </span>
            <span>Add a workplace</span>
          </div>
        </div>
        <div className={`mt-3`}>
          <div className={`has-text-weight-bold`}>Education</div>
          <div className={`mt-3`}>
            <div>
              <div className="field">
                <input id="switchRoundedInfo" type="checkbox" name="switchRoundedInfo"
                       className="switch is-rounded is-info" checked="checked"/>
                  <label htmlFor="switchRoundedInfo">
                    Studied at Foreign Trade University
                  </label>
              </div>
            </div>
          </div>
          <div className={`button is-outlined is-small is-info is-rounded mt-3`}>
            <span className={`icon`}>
              <i className="fa-solid fa-plus"></i>
            </span>
            <span>Add high school</span>
          </div>
          <br/>
          <div className={`button is-outlined is-small is-info is-rounded mt-3`}>
            <span className={`icon`}>
              <i className="fa-solid fa-plus"></i>
            </span>
            <span>Add college</span>
          </div>
        </div>
        <div className={`mt-3`}>
          <div className={`has-text-weight-bold`}>Current city</div>
        </div>
        <div className={`mt-3`}>
          <div className={`has-text-weight-bold`}>Home town</div>
        </div>
        <div className={`mt-3`}>
          <div className={`has-text-weight-bold`}>Relationship</div>
        </div>
      </div>
    </BaseModal>
  );
}

export default EditIntro;