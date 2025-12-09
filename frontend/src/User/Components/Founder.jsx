import React from "react"
import styles from "../Styles/Founder.module.css"

function Founder() {
  const founders = [
    {
      id: 1,
      name: "MUDDASSAR",
      image: "/images/founder-1.jpg",
      description:
        "Muddassar brings the dark edge. With a background in fashion design and an obsession with subcultures, he channels gothic aesthetics into wearable rebellion. He leads the creative vision of the brand — blending the raw with the refined, the romantic with the brutal. He believes streetwear should haunt as much as it hypes.",
      alignment: "left",
    },
    {
      id: 2,
      name: "MANSOOR",
      image: "/images/founder-2.jpg",
      description:
        "Mansoor builds the bones. Coming from a background in underground music and visual design, he’s the mind behind the brand’s identity and street influence. Jace handles storytelling, branding, and collaborations — keeping the pulse on the streets while pushing boundaries into darker territory.",
      alignment: "right",
    },
  ]

  return (
    <div className={styles.founderSection}>
      <div className="container">
        <div className={styles.headingContainer}>
          <h2 className={styles.heading}>
            TIMELESS
            <br />
            FOUNDERS
          </h2>
        </div>

        {founders.map((founder, index) => (
          <div
            key={founder.id}
            className={`row align-items-center ${styles.founderRow}`}
          >
            {founder.alignment === "left" ? (
              <>
                <div className="col-md-6 mb-4 mb-md-0">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className={styles.image}
                  />
                </div>
                <div className="col-md-6">
                  <div className={styles.textLeft}>
                    <h3 className={styles.name}>{founder.name}</h3>
                    <p className={styles.description}>{founder.description}</p>
                    <button className={styles.button}>View Article</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-md-6 order-md-2 mb-4 mb-md-0">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className={styles.image}
                  />
                </div>
                <div className="col-md-6 order-md-1">
                  <div className={styles.textRight}>
                    <h3 className={styles.name}>{founder.name}</h3>
                    <p className={styles.description}>{founder.description}</p>
                    <button className={styles.button}>View Article</button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Founder
