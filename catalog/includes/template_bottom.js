print('')
print('</div> <!-- bodyContent //-->')
print('')
print('')

if (oscTemplate.hasBlocks('boxes_column_left')) {
    print('')
    print('<div id="columnLeft" class="grid_'
         + oscTemplate.getGridColumnWidth()
         + ' pull_'
         + oscTemplate.getGridContentWidth()
         + '">'
         + '  '
         + oscTemplate.getBlocks('boxes_column_left')
         + '</div>')
    print('')
    print('')
}

if (oscTemplate.hasBlocks('boxes_column_right')) {
    print('')
    print('<div id="columnRight" class="grid_'
         + oscTemplate.getGridColumnWidth()
         + '">'
         + '  '
         + oscTemplate.getBlocks('boxes_column_right')
         + '</div>')
    print('')
    print('')
}

print('')
print('')

eval(fs.readFileSync(DIR_WS_INCLUDES + 'footer.js').toString())

print('')
print('</div> <!-- bodyWrapper //-->')
print('')
print('')

print(oscTemplate.getBlocks('footer_scripts'));
print('')
print('</body>')
print('</html>')
print('')
