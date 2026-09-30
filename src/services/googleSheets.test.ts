import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeProjectData } from './googleSheets';

test('totalProjects should include only the four official stages and ignore under-commissioned/non-stage rows', () => {
  const rows = [
    ['Assignment', 'Description', 'Plant', 'Stage', 'Cost (Rs in Cr)'],
    ['A1', 'Project 1', 'Plant A', 'Stage 2', '100'],
    ['A2', 'Project 2', 'Plant A', 'Stage 1', '50'],
    ['A3', 'Project 3', 'Plant B', 'Under Consideration', '30'],
    ['A4', 'Project 4', 'Plant C', 'Under Commissioned', '20'],
  ];

  const { stats, projects } = normalizeProjectData(rows);

  assert.equal(stats.totalProjects, 3);
  assert.equal(stats.totalActiveProjects, 3);
  assert.equal(stats.otherCount, 1);
  assert.equal(projects.length, 4);
});
