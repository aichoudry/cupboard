def update_fleet_grid(row: int, col: int, fleet_grid: list, ships: list, sizes: list, hits_list: list) -> None:
    """
    Updates the fleet grid to show a hit has occurred by turning a lowercase character uppercase, and updates the hits list to reflect the hit by increasing the appropriate value by 1. The function also calls on print_sunk_message if the hits list values reaches the size of that particular ship. 
    """

    if fleet_grid[row][col] in ships:
        fleet_grid[row][col] = fleet_grid[row][col].upper()
        index = ships.index(fleet_grid[row][col].lower())
        hits_list.insert((index), hits_list.pop(index) + 1)


fleet_grid = [['.', '.', '.', '.', '.'], ['a', 'b', 'd', '.', '.'], ['.', '.', 'e', '.', '.'], [
    'c', '.', '.', '.', '.'], ['c', '.', '.', '.', '.']]
hits_list = [0, 0, 0, 0, 0]
update_fleet_grid(1, 0, fleet_grid,  ['a', 'b', 'c', 'd', 'e'], [
                  1, 1, 2, 1, 1], hits_list)
print(fleet_grid, hits_list)
