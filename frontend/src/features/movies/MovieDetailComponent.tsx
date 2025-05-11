/** @format */

import { ReactNode } from "react";
import { MovieDetails, TomatosProps } from "../../interfaces/movieInterfaces";
import SectionHeader from "../../ui/SectionHeader";
import formatDate from "../../services/formatDate";

interface SectionInterface {
  movie?: MovieDetails;
  id?: string;
}

// small component
const ChildSection: React.FC<{ children: ReactNode; gap?: string }> = ({
  children,
}) => {
  return <div className="mx-8 flex gap-8">{children}</div>;
};

const ContentSection: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <div className="flex flex-col gap-8">{children}</div>;
};

const Tomatoes: React.FC<{ tomatoes?: TomatosProps }> = ({ tomatoes }) => {
  return (
    <ChildSection>
      <h2 className="medium-movie-title">tomatoes</h2>

      <div className="flex flex-col gap-1">
        {/* viewer */}
        {tomatoes?.viewer ? (
          <span>
            Viewer: {tomatoes?.viewer.rating} ⭐ ({tomatoes?.viewer.numReviews}{" "}
            reviews / {tomatoes?.viewer.meter}%)
          </span>
        ) : (
          "Updating..."
        )}

        {/* critics */}
        {tomatoes?.critic ? (
          <span>
            Critic: {tomatoes?.critic.rating} ⭐ ({tomatoes?.critic.numReviews}{" "}
            reviews / {tomatoes?.critic.meter}%)
          </span>
        ) : (
          "Updating..."
        )}
      </div>
    </ChildSection>
  );
};

// section
export const Plot: React.FC<SectionInterface> = ({ movie, id }) => {
  return (
    <div>
      <SectionHeader title="Plot" id={id}></SectionHeader>

      {/* plot */}
      <ContentSection>
        <ChildSection>
          <h2 className="medium-movie-title">Plot</h2>
          <p className="">{movie?.plot}</p>
        </ChildSection>

        {/* desciption */}
        <ChildSection>
          <h2 className="medium-movie-title">Description</h2>
          <p className="">{movie?.fullplot}</p>
        </ChildSection>
      </ContentSection>
    </div>
  );
};

export const Awards: React.FC<SectionInterface> = ({ movie, id }) => {
  return (
    <div>
      <SectionHeader title="Ratings/Awards" id={id} />

      <ContentSection>
        {/* imdb */}
        <ChildSection>
          <h2 className="medium-movie-title">imdb</h2>
          <div className="flex flex-col gap-1">
            <span>Rating: {movie?.imdb.rating} ⭐</span>
            <span>Votes: {movie?.imdb.votes}</span>
          </div>
        </ChildSection>

        {/* tomatoes */}
        <Tomatoes tomatoes={movie?.tomatoes} />

        {/* metacritic */}
        <ChildSection>
          <h2 className="medium-movie-title">metacritic</h2>
          <span>{movie?.metacritic || "Updating"}</span>
        </ChildSection>

        {/* awards */}
        <ChildSection>
          <h2 className="medium-movie-title">awards</h2>
          <div className="flex flex-col gap-1">
            <span>Wins: {movie?.awards.wins}</span>
            <span>Nominations: {movie?.awards.nominations}</span>
            <span>Details: {movie?.awards.text}</span>
          </div>
        </ChildSection>
      </ContentSection>
    </div>
  );
};

export const CastsAndCrew: React.FC<SectionInterface> = ({ movie, id }) => {
  return (
    <div>
      <SectionHeader id={id} title="casts & crew" />

      <ContentSection>
        {/* cats */}
        <ChildSection>
          <h2 className="medium-movie-title">casts</h2>
          <p>{movie?.cast?.join(", ")}</p>
        </ChildSection>

        {/* writer */}
        <ChildSection>
          <h2 className="medium-movie-title">writer</h2>
          <p>{movie?.writers?.join(", ") || "Updating..."}</p>
        </ChildSection>

        {/* director */}
        <ChildSection>
          <h2 className="medium-movie-title">director</h2>
          <p>{movie?.directors?.join(", ") || "Updating..."}</p>
        </ChildSection>
      </ContentSection>
    </div>
  );
};

export const Production: React.FC<SectionInterface> = ({ movie, id }) => {
  return (
    <div>
      <SectionHeader title="production" id={id} />

      <ContentSection>
        {/* language */}
        <ChildSection>
          <h2 className="medium-movie-title">languages</h2>
          <p>{movie?.languages.join(", ") || "Updating..."}</p>
        </ChildSection>

        {/* country */}
        <ChildSection>
          <h2 className="medium-movie-title">country</h2>
          <p>{movie?.countries.join(", ") || "Updating..."}</p>
        </ChildSection>

        {/* release date */}
        <ChildSection>
          <h2 className="medium-movie-title">release date</h2>
          <p>{movie?.released ? formatDate(movie.released) : "Updating..."}</p>
        </ChildSection>
      </ContentSection>
    </div>
  );
};
