import React from 'react';
import classnames from 'classnames';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Use one of reference applications and modify them for your own needs</>,
    imageUrl: 'img/input.png',
    description: (
      <>
        {/* Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly. */}
      </>
    ),
  },
  {
    title: <>Customize by using components and forms</>,
    imageUrl: 'img/config.png',
    description: (
      <>
        {/* Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory. */}
      </>
    ),
  },
  {
    title: <>Deploy using one of the supported cloud providers</>,
    imageUrl: 'img/rocket.png',
    description: (
      <>
        {/* Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer. */}
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className="text--center">
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3 className={styles.featureTitle}>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export function Features () {
  return (
    <div className={styles.splitContainer}>
      <div className={classnames(styles.leftSplit, styles.featureSticky)}>
        <div className={styles.stickyContent}>
          <h2 className="hero__subtitle">Open Volunteer Platform Workflow</h2>
          <p>Open Volunteer Platform lets you build and deploy applications to help your organization with all volunteering efforts.
             Simply define your business model for Volunteers and Recipients and Deploy it to Cloud in hours instead of days.
          </p>
        </div>
      </div>
      <div className={styles.rightSplit}>
        <div className={classnames(styles.splitRow, styles.before)}></div>
        {
          features && features.length && (
            features.map((props, index) => {
              return (
                <div className={styles.splitRow} key={index}>
                  <Feature {...props} />
                </div>
              );
            })
          )
        }
        <div className={classnames(styles.splitRow, styles.after)}></div>
      </div>
    </div>
  );
}