import FilterBar from "./FilterBar";
import Pagination from "../../../common/pagination/Pagination";
import {useLoaderData, useNavigate} from "react-router-dom";
import utils from "../../../utils/utils";
import {beClient} from "../../../config/BeClient";


function ListCompany() {
  const {page, search, industry, province} = utils.getUrlQueryParams(['page', 'search', 'industry', 'province'])
  const navigate = useNavigate();
  const [{companies, total}, industries, provinces] = useLoaderData();

  function changePage(page) {
    navigate(`/company${utils.createQueryString({page, search, industry, province})}`)
  }



  const listCompanyCard =  <div className='mt-4 columns is-multiline'>
    {
      companies.map(company => (
        <div key={company._id} className='column is-4 is-clickable' onClick={() => navigate(`/company/${company._id}/detail`)}>
          <div className='card'>
            <div className='card-content'>
              <div className="media">
                <div className="media-left">
                  <figure className="image is-48x48">
                    <img src={company.logo || process.env.REACT_APP_DEFAULT_COMPANY_LOGO}/>
                  </figure>
                </div>
              </div>

              <div className='content'>
                <div className='has-text-weight-bold'>{company.name}</div>
                <div>Province: {company.province}</div>
                <div>Industry: {company.industry}</div>
                <div>size: {company.size}</div>
              </div>
            </div>
          </div>
        </div>
      ))
    }
  </div>

  return (
    <div>
      <div className='subtitle mt-4 has-text-weight-bold'>List Company</div>

      <div className='mt-4'>
        <FilterBar industries={industries} provinces={provinces} />
      </div>
      {
        companies.length > 0 ? listCompanyCard : <div>No result found</div>
      }

      <Pagination currentPage={Number(page)} totalItem={total} onChangePage={changePage}/>
    </div>
  );
}

function loadCompanies({request}) {
  const {search, page, industry, province} =
    utils.getUrlQueryParamsFromRequest(request, ['search', 'page', 'industry', 'province']);
  const queryString = utils.createQueryString({search, page, industry, province});

  return Promise.all([
    beClient.get(`/company${queryString}`),
    beClient.get(`/company/industries`).then((res) => res.data),
    beClient.get(`/company/provinces`).then((res) => res.data),

  ])
}


export {loadCompanies};
export default ListCompany;


