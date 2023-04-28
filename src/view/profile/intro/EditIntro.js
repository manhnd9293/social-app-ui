import React, {useState} from 'react';
import BaseModal from "../../../common/modal/BaseModal";

function EditIntro({onClose}) {

  const [educations, setEducations] = useState(currentUser.educations);
  const [relationship, setRelationship] = useState(currentUser.relationship);

  function toggleShowEducation(index) {
    const updateEducations = structuredClone(educations);
    updateEducations[index].show = !educations[index].show;
    setEducations(updateEducations);
  }

  function toggleRelationship() {
    const update = structuredClone(relationship);
    update.show = !relationship.show;
    setRelationship(update);
  }

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
              {
                educations.map((edu, index) =>
                  <div key={edu.name} className={`is-flex is-justify-content-space-between`}>
                    <div>
                      <div className="field">
                        <input id={`switchEdu-${index}`}
                               type="checkbox"
                               name="switchRoundedInfo"
                               className="switch is-rounded is-info"
                               checked={edu.show}
                               onChange={() => toggleShowEducation(index)}
                        />
                        <label htmlFor={`switchEdu-${index}`} style={{userSelect: 'none'}}>
                          {`Studying at ${edu.name}`}
                        </label>
                      </div>

                    </div>
                    <div className={`icon is-clickable`}>
                      <i className="fa-solid fa-pen"></i>
                    </div>
                  </div>
                )
              }
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
          <AddDataBtn name={'Add City'}/>
        </div>
        <div className={`mt-3`}>
          <div className={`has-text-weight-bold`}>Home town</div>
          <AddDataBtn name={'Add hometown'}/>
        </div>
        <div className={`mt-3`}>
          <div className={`has-text-weight-bold`}>Relationship</div>
          <div className={`is-flex is-justify-content-space-between`}>
            <div>
              <div className="field">
                <input id={`switchRel`}
                       type="checkbox"
                       name="switchRoundedInfo"
                       className="switch is-rounded is-info"
                       checked={relationship.show}
                       onChange={toggleRelationship}
                />
                <label htmlFor={`switchRel`} style={{userSelect: 'none'}}>
                  {`${relationship.state}`}
                </label>
              </div>

            </div>
            <div className={`icon is-clickable`}>
              <i className="fa-solid fa-pen"></i>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}

function AddDataBtn({name}) {
  return (
    <div className={`button is-outlined is-small is-info is-rounded mt-3`}>
            <span className={`icon`}>
              <i className="fa-solid fa-plus"></i>
            </span>
      <span>{name}</span>
    </div>
  )
}

export default EditIntro;
const currentUser = {
  educations: [
    {
      show: true,
      name: 'Foreign Trade University',
      level: 'University',
      state: 'Learning'
    },
    {
      show: false,
      name: 'HNUE High school for gifted student',
      level: 'High School',
      state: 'Graduate'
    }
  ],
  relationship: {
    state: 'Single',
    show: 'true'
  }
}

