import FilterBar from "./FilterBar";
import Pagination from "../../../common/pagination/Pagination";
import {useLoaderData, useNavigate} from "react-router-dom";
import utils from "../../../utils/utils";
import {beClient} from "../../../config/BeClient";


function ListCompany(props) {
  const {page, search, industry, province} = utils.getUrlQueryParams(['page', 'search', 'industry', 'province'])
  const navigate = useNavigate();
  const {companies, total} = useLoaderData();

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
                    <img src={company.logo}/>
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
        <FilterBar />
      </div>
      {
        companies.length > 0 ? listCompanyCard : <div>No result found</div>
      }


      <Pagination currentPage={Number(page)} totalItem={total} onChangePage={changePage}/>
    </div>
  );
}

function loadCompanies() {
  const {search, page, industry, province} =
    utils.getUrlQueryParams(['search', 'page', 'industry', 'province']);
  const queryString = utils.createQueryString({search, page, industry, province});



  return beClient.get(`/company${queryString}`)
}

export {loadCompanies};


const companies = [
  {
    _id: 1,
    name: 'Vin Home',
    province: 'Hanoi',
    image: 'https://downloadlogomienphi.com/sites/default/files/logos/download-logo-vector-vinhome-mien-phi.jpg',
    industry: 'Real estate',
    size: 'More than 10000'
  },
  {
    _id: 2,
    name: 'Vin Fast',
    province: 'Hanoi',
    image: 'https://inkythuatso.com/uploads/images/2021/10/logo-vinfast-inkythuatso-21-11-08-55.jpg',
    industry: 'Car',
    size: 'More than 10000'
  },,
  {
    _id: 3,
    name: 'Vinamilk',
    province: 'Hanoi',
    image: 'data:image/png;base64,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',
    industry: 'Food and Beverage',
    size: 'More than 10000'
  },
  {
    _id: 4,
    name: 'PwC',
    province: 'Hanoi',
    image: 'https://brademar.com/wp-content/uploads/2022/05/PwC-Logo-PNG-2010-%E2%80%93-Now-1.png',
    industry: 'Financial Service',
    size: 'More than 10000'
  },
  {
    _id: 5,
    name: 'Samsung',
    province: 'Hanoi',
    image: 'https://1000logos.net/wp-content/uploads/2017/06/Samsung-Logo-2.png',
    industry: 'Electronics',
    size: 'More than 10000'
  },
  {
    _id: 6,
    name: 'Toyota',
    province: 'Hanoi',
    image: 'https://global.toyota/pages/global_toyota/mobility/toyota-brand/emblem_ogp_001.png',
    industry: 'Automobile',
    size: 'More than 10000'
  },
  {
    _id: 7,
    name: 'Google',
    province: 'Ho Chi Minh',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png',
    industry: 'Information Technology',
    size: 'More than 10000'
  },
  {
    _id: 8,
    name: 'VNG',
    province: 'Hanoi',
    image: 'data:image/png;base64,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',
    industry: 'Information Technology',
    size: 'More than 10000'
  },
  {
    _id: 9,
    name: 'Shopee',
    province: 'Hanoi',
    image: 'https://cf.shopee.ph/file/281963778cd53e255294e126298ce124',
    industry: 'Tourist',
    size: 'More than 10000'
  },
  {
    _id: 10,
    name: 'Dat Xanh',
    province: 'Hanoi',
    image: 'https://danhkhoireal.vn/wp-content/uploads/2019/11/logo-dat-xanh-group.jpg',
    industry: 'Real estate',
    size: 'More than 10000'
  },
]
export default ListCompany;