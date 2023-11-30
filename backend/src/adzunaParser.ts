type AdzunaResponse = {
  mean: number;
  results: AdzunaJob[];
  count: number;
  __CLASS__: string;
};

type AdzunaJob = {
  id: string;
  created: string;
  longitude: number;
  latitude: number;
  title: string;
  salary_is_predicted: string;
  salary_min: number;
  salary_max: number;
  redirect_url: string;
  location: {
    area: string[];
    display_name: string;
    __CLASS__: string;
  };
  company: {
    __CLASS__: string;
    display_name: string;
  };
  category: {
    __CLASS__: string;
    label: string;
    tag: string;
  };
  description: string;
  contract_time: string;
  __CLASS__: string;
};

type FrontEndFields = {
  id: string;
  created: string;
  title: string;
  salary_min: number;
  salary_max: number;
  redirect_url: string;
  location: string;
  company: string;
  contract_time: string;
};

function parseAdzunaResponse(response: AdzunaResponse): FrontEndFields[] {
  const results = response.results;
  const parsedResults = results.map(
    (result): FrontEndFields => ({
      id: result.id,
      created: result.created,
      title: result.title,
      salary_min: result.salary_min,
      salary_max: result.salary_max,
      redirect_url: result.redirect_url,
      location: result.location.display_name,
      company: result.company.display_name,
      contract_time: result.contract_time,
    })
  );

  return parsedResults;
}
