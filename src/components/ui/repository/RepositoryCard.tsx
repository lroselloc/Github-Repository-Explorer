import { Card, Col, Row } from "react-bootstrap";
import { Repository } from "../../../models/userRepositorySearchResponse";
import formatNumber from "../../../utils/formatNumber";

export interface RepositoryCardProps {
  repository: Repository;
}

const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  return (
    <Card bg="Light" key="Light" text="dark" className="mb-2">
      <Card.Body>
        <Card.Title>
          <Row>
            <Col xs="8">{repository.name}</Col>
            <Col xs="4">
              <div className="me-2">
                <p className="text-end">
                  {formatNumber(repository.stargazers_count)} &nbsp;
                  <i className="bi bi-star-fill"></i>
                </p>
              </div>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{repository.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RepositoryCard;
