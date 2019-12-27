import React, {useState, useEffect} from "react";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {ReportsCard, Loading, CustomPaginate} from "../components";
import {ColStyle} from "../styles";

function LatestReports() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getData = async () => {
    try {
      const results = await axios.get(
        `https://spaceflightnewsapi.net/api/v1/reports?limit=6&page=${page}`
      );
      setData(results.data);
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  };

  if (loading) {
    return (
      <Container>
        <Row>
          <Loading/>
        </Row>
      </Container>
    )
  } else {
    return (
      <Container>
        <Row>
          {data.docs.map(article => {
            return (
              <Col xl={4} lg={4} sm={6} key={article._id} style={ColStyle}>
                <ReportsCard
                  title={article.title}
                  site={article.news_site_long}
                  url={article.url}
                  date={article.published_date}
                  summary={article.summary}
                />
              </Col>
            );
          })}
        </Row>
        <Row>
          <Col>
            <CustomPaginate
              totalPages={data.totalPages}
              setPage={setPage}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}


export default LatestReports;
